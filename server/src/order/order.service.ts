import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './order.schema'
import { Model } from 'mongoose'
import { User } from '../user/schema/user.schema'
import { CreateOrderInput } from './dto/create-order.dto'

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async create(customer: User, createOrderInput: CreateOrderInput): Promise<Order> {
    const order = await this.orderModel.create({
      ...createOrderInput,
      customer: customer._id,
    })

    return order
  }
}
