import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Interval, SchedulerRegistry } from '@nestjs/schedule'
import {
  RestaurantAuthorizedException,
  RestaurantNotFoundException,
} from 'src/restaurant/restaurant.exception'
import { Restaurant, RestaurantModel } from 'src/restaurant/restaurant.schema'
import { User, UserModel } from '../schema/user.schema'
import { CreatePaymentInput } from './dto/create-payment.dto'
import { Payment } from './payments.schema'

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(User.name) private readonly userModel: UserModel,
    @InjectModel(Restaurant.name) private readonly restaurantModel: RestaurantModel,
    private readonly scheduleResgistry: SchedulerRegistry,
  ) {}

  async createPayment(owner: User, createPaymentInput: CreatePaymentInput) {
    const { restaurantId, transactionId } = createPaymentInput
    const restaurant = await this.restaurantModel.findById(restaurantId)
    if (!restaurant) {
      throw new RestaurantNotFoundException()
    }

    if (!restaurant.owner.equals(owner._id)) {
      throw new RestaurantAuthorizedException()
    }

    const ownerDoc = await this.userModel.findByIdAndUpdate(owner._id, {
      $push: { payments: { transactionId, restaurantId } },
    })

    restaurant.isPromoted = true
    const date = new Date()
    date.setDate(date.getDate() + 7)
    restaurant.promotedUntil = date
    await restaurant.save()

    return ownerDoc
  }

  getPayments(owner: User): Payment[] {
    return owner.payments
  }

  @Interval(2000)
  async checkPromotedRestaurants() {
    await this.restaurantModel.updateMany(
      {
        isPromoted: true,
        promotedUntil: { $lt: new Date('2022-12-01') },
      },
      {
        isPromoted: false,
        promotedUntil: null,
      },
      { new: true },
    )
  }
}
