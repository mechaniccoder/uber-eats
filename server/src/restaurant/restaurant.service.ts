import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { Restaurant, RestaurantModel } from './restaurant.schema'

@Injectable()
export class RestaurantService {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: RestaurantModel) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find({})
  }

  create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const createdRestaurant = new this.restaurantModel(createRestaurantDto)
    return createdRestaurant.save()
  }

  async update(updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    return this.restaurantModel.findOneAndUpdate(
      {
        _id: updateRestaurantDto._id,
      },
      updateRestaurantDto,
      {
        new: true,
      },
    )
  }
}
