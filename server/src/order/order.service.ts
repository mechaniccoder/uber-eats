import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PubSub } from 'graphql-subscriptions'
import mongoose, { Model } from 'mongoose'
import { PUB_SUB } from 'src/shared/common.constants'
import { DishNotFoundException } from '../restaurant/dish/dish.exception'
import { Dish } from '../restaurant/dish/dish.schema'
import { RestaurantNotFoundException } from '../restaurant/restaurant.exception'
import { Restaurant } from '../restaurant/restaurant.schema'
import { User, UserRole } from '../user/schema/user.schema'
import { CreateOrderInput } from './dto/create-order.dto'
import { GetOrdersInput } from './dto/get-orders.dto'
import { UpdateOrderInput } from './dto/update-order.dto'
import { COOKED_ORDER, ORDER_UPDATED, PENDING_ORDER, PICKEDUP_ORDER } from './order.constants'
import {
  OrderAlreadyTakenException,
  OrderNotAuthorizedException,
  OrderNotFoundException,
  OrderStatusNotAuthorizedException,
} from './order.exception'
import { Order, OrderStatus } from './order.schema'
import { TakeOrderInput } from './dto/take-order.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  async create(customer: User, createOrderInput: CreateOrderInput): Promise<Order> {
    const { restaurantId, dishIds } = createOrderInput

    const restaurant = await this.restaurantModel.findById(restaurantId)
    if (!restaurant) {
      throw new RestaurantNotFoundException()
    }

    const dishes: Dish[] = []
    let totalPrice = 0
    for (const dishId of dishIds) {
      const dishDoc = restaurant.dishes.find((dish) => dish.id === dishId)
      if (!dishDoc) throw new DishNotFoundException()
      totalPrice += dishDoc.price
      dishes.push(dishDoc)
    }

    const anOrder = await this.orderModel.create({
      status: OrderStatus.Pending,
      dishes: [...dishes.map((dish) => dish.name)],
      customer: customer._id,
      restaurant: new mongoose.Types.ObjectId(restaurantId),
      total: totalPrice,
    })

    const populatedOrder = await anOrder.populate<{ restaurant: Restaurant }>(
      'restaurant',
      'name address img owner',
    )

    this.pubsub.publish(PENDING_ORDER, { pendingOrders: populatedOrder })

    return populatedOrder
  }

  public async getOrders(user: User, getOrderInput: GetOrdersInput): Promise<Order[]> {
    const { role } = user
    const { status } = getOrderInput

    let orders: Order[] = []
    if (role === UserRole.customer) {
      orders = await this.orderModel
        .find({ ...(status && { status }), customer: user._id })
        .populate('restaurant')
    } else if (role === UserRole.owner) {
      const restaurants = await this.restaurantModel
        .find({ owner: user._id })
        .populate('restaurant')
      orders = await this.orderModel
        .find({ ...(status && { status }) })
        .in(
          'restaurant',
          restaurants.map((restaurant) => restaurant._id),
        )
        .populate('restaurant')
    } else {
      orders = await this.orderModel
        .find({ ...(status && { status }), driver: user._id })
        .populate('restaurant')
    }

    return orders
  }

  public async getOrder(
    user: User,
    orderId: string,
  ): Promise<Omit<Order, 'restaurant'> & { restaurant: Restaurant }> {
    const order = await this.orderModel
      .findById(orderId)
      .populate<{ restaurant: Restaurant }>('restaurant')
    if (!order) throw new OrderNotFoundException()

    if (
      order.customer !== user._id &&
      order.restaurant.owner !== user._id &&
      order.driver !== user._id
    )
      throw new OrderNotAuthorizedException()

    return order
  }

  public async update(user: User, updateOrderInput: UpdateOrderInput) {
    const { id, status } = updateOrderInput

    const order = await this.orderModel
      .findById(id)
      .populate<{ restaurant: Restaurant }>('restaurant')

    if (!order) throw new OrderNotFoundException()

    if (!this.canSeeOrder(user, order)) {
      throw new OrderNotAuthorizedException()
    }

    if (!this.canUpdateOrder(user, order.status)) {
      throw new OrderStatusNotAuthorizedException(user, order.status)
    }

    const updatedOrder = await (
      await this.orderModel.findByIdAndUpdate(id, { status }, { new: true })
    ).populate('customer restaurant driver')

    if (this.cookCompleted(user, status)) {
      this.notifyToDelivery(updatedOrder)
    }

    this.notifyToAll(updatedOrder)

    return updatedOrder
  }

  private notifyToAll(updatedOrder: Order) {
    this.pubsub.publish(ORDER_UPDATED, { orderUpdated: updatedOrder })
  }

  private notifyToDelivery(updatedOrder: Order) {
    this.pubsub.publish(COOKED_ORDER, { cookedOrders: updatedOrder })
  }

  private cookCompleted(user: User, status: OrderStatus) {
    return user.role === UserRole.owner && status === OrderStatus.Cooked
  }

  private canSeeOrder(
    user: User,
    order: Omit<Order, 'restaurant'> & { restaurant: Restaurant },
  ): boolean {
    if (user.role === UserRole.customer && !order.customer.equals(user._id)) {
      return false
    }

    if (user.role === UserRole.delivery && !order.driver.equals(user._id)) {
      return false
    }

    if (user.role === UserRole.owner && !order.restaurant.owner.equals(user._id)) {
      return false
    }

    return true
  }

  private canUpdateOrder(user: User, status: OrderStatus): boolean {
    if (user.role === UserRole.owner) {
      if (!canStatusChangedByOwner()) {
        return false
      }

      return true
    }

    if (user.role === UserRole.customer) {
      if (!canStatusChangedByCustomer()) {
        return false
      }

      return true
    }

    if (user.role === UserRole.delivery) {
      if (!canStatusChangedByDelivery()) {
        return false
      }

      return true
    }

    return false

    function canStatusChangedByDelivery() {
      return status === OrderStatus.PickedUp || status === OrderStatus.Delivered
    }

    function canStatusChangedByCustomer() {
      return status === OrderStatus.Pending
    }

    function canStatusChangedByOwner() {
      return (
        status === OrderStatus.Pending ||
        status === OrderStatus.Cooked ||
        status === OrderStatus.Cooking
      )
    }
  }

  async takeOrder(driver: User, takeOrderInput: TakeOrderInput) {
    const { id: orderId } = takeOrderInput

    const order = await this.orderModel.findById(orderId)

    if (!order) {
      throw new OrderNotFoundException()
    }

    if (order.driver) {
      throw new OrderAlreadyTakenException(order.driver.toString())
    }

    order.driver = driver._id
    order.status = OrderStatus.PickedUp
    await order.populate('restaurant')
    const updatedOrder = await order.save()

    await this.pubsub.publish(ORDER_UPDATED, {
      orderUpdated: updatedOrder,
    })

    return updatedOrder
  }
}
