import { Injectable } from '@nestjs/common'
import { CreateDishInput } from './dto/create-dish.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Restaurant } from '../restaurant.schema'
import { Model } from 'mongoose'
import { RestaurantService } from '../restaurant.service'
import { RestaurantAuthorizedException, RestaurantNotFoundException } from '../restaurant.exception'
import { User, UserDocument } from '../../user/schema/user.schema'

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>,
    private readonly restaurantService: RestaurantService,
  ) {}

  async create(owner: User, createDishInput: CreateDishInput) {
    const { restaurantId } = createDishInput

    const aRestaurant = await this.restaurantModel.findById(restaurantId)
    if (!aRestaurant) {
      throw new RestaurantNotFoundException()
    }

    if (owner._id !== aRestaurant.owner) {
      throw new RestaurantAuthorizedException()
    }

    aRestaurant.dishes.push(createDishInput)
    await aRestaurant.save()

    return createDishInput
  }
}
