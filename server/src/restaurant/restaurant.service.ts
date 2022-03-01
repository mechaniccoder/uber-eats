import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/user/schema/user.schema'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { Restaurant, RestaurantModel } from './restaurant.schema'

@Injectable()
export class RestaurantService {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: RestaurantModel) {}

  async create(authUser: User, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = await this.restaurantModel.create({
      ...createRestaurantDto,
      owner: authUser.id,
    })

    return newRestaurant
  }
}
