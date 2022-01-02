import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Restaurant, RestaurantModel } from './restaurant.schema'

@Injectable()
export class RestaurantService {
  constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: RestaurantModel) {}

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find({})
    return restaurants
  }
}
