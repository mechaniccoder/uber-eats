import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderStatus } from './order.schema'
import mongoose, { Model, Types } from 'mongoose'
import { User } from '../user/schema/user.schema'
import { CreateOrderInput } from './dto/create-order.dto'
import { Restaurant } from '../restaurant/restaurant.schema'
import { RestaurantNotFoundException } from '../restaurant/restaurant.exception'
import { DishNotFoundException } from '../restaurant/dish/dish.exception'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async create(customer: User, createOrderInput: CreateOrderInput): Promise<Order> {
    const { restaurantId, dishName } = createOrderInput
    const restaurant = await this.restaurantModel.findById(restaurantId)
    if (!restaurant) {
      throw new RestaurantNotFoundException()
    }

    const dish = restaurant.dishes.find((dish) => dish.name === dishName)
    if (!dish) {
      throw new DishNotFoundException()
    }

    const aOrder = await this.orderModel.create({
      status: OrderStatus.Pending,
      dishes: [dishName],
      customer: customer._id,
      restaurant: restaurantId,
      total: 0,
    })

    const populatedOrder = await aOrder.populate<{ restaurant: Restaurant }>(
      'restaurant',
      'name address img',
    )

    console.log(populatedOrder)
    return populatedOrder
  }
}
