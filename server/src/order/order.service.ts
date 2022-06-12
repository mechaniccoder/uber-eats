import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderStatus } from './order.schema'
import mongoose, { Model } from 'mongoose'
import { User, UserRole } from '../user/schema/user.schema'
import { CreateOrderInput } from './dto/create-order.dto'
import { Restaurant } from '../restaurant/restaurant.schema'
import { RestaurantNotFoundException } from '../restaurant/restaurant.exception'
import { DishNotFoundException } from '../restaurant/dish/dish.exception'
import { Dish } from '../restaurant/dish/dish.schema'
import { GetOrdersInput } from './dto/get-orders.dto'
import { OrderNotAuthorizedException, OrderNotFoundException } from './order.exception'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>,
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

    return await anOrder.populate<{ restaurant: Restaurant }>('restaurant', 'name address img')
  }

  public async getOrders(user: User, getOrderInput: GetOrdersInput): Promise<Order[]> {
    const { role } = user
    const { status } = getOrderInput

    let orders: Order[] = []
    if (role === UserRole.customer) {
      orders = await this.orderModel.find({ ...(status && { status }), customer: user._id })
    } else if (role === UserRole.owner) {
      const restaurants = await this.restaurantModel.find({ owner: user._id })
      orders = await this.orderModel.find({ ...(status && { status }) }).in(
        'restaurant',
        restaurants.map((restaurant) => restaurant._id),
      )
    } else {
      orders = await this.orderModel.find({ ...(status && { status }), driver: user._id })
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
}
