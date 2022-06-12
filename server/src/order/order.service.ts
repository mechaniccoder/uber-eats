import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderStatus } from './order.schema'
import mongoose, { Model } from 'mongoose'
import { User } from '../user/schema/user.schema'
import { CreateOrderInput } from './dto/create-order.dto'
import { Restaurant } from '../restaurant/restaurant.schema'
import { RestaurantNotFoundException } from '../restaurant/restaurant.exception'
import { DishNotFoundException } from '../restaurant/dish/dish.exception'
import { Dish } from '../restaurant/dish/dish.schema'

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
}
