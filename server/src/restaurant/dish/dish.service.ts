import { Injectable } from '@nestjs/common'
import { CreateDishInput } from './dto/create-dish.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Restaurant } from '../restaurant.schema'
import { Model } from 'mongoose'
import { RestaurantService } from '../restaurant.service'

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>,
    private readonly restaurantService: RestaurantService,
  ) {}

  async create(createDishInput: CreateDishInput) {
    const { restaurantId } = createDishInput

    const aRestaurant = await this.restaurantModel.findById(restaurantId)
  }
}
