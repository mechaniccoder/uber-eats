import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { Restaurant, RestaurantModel } from './restaurant.schema'

@Injectable()
export class RestaurantService {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: RestaurantModel) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find({})
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const createdRestaurant = new this.restaurantModel(createRestaurantDto)
    return createdRestaurant.save()
  }
}
