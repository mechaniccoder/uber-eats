import { Injectable } from '@nestjs/common'
import { CreateDishInput } from './dto/create-dish.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Restaurant } from '../restaurant.schema'
import { Model } from 'mongoose'
import { RestaurantService } from '../restaurant.service'
import { RestaurantAuthorizedException, RestaurantNotFoundException } from '../restaurant.exception'
import { User, UserDocument } from '../../user/schema/user.schema'
import { DeleteDishInput } from './dto/delete-dish.dto'
import { Dish } from './dish.schema'
import { DishNotFoundException } from './dish.exception'

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

    if (!owner._id.equals(aRestaurant.owner)) {
      throw new RestaurantAuthorizedException()
    }

    aRestaurant.dishes.push(createDishInput)
    await aRestaurant.save()

    return createDishInput
  }

  async delete(owner: User, deleteDishInput: DeleteDishInput): Promise<Dish[]> {
    const { restaurantId, name: deletingDishName } = deleteDishInput

    const aRestaurant = await this.restaurantModel.findById(restaurantId)

    if (!aRestaurant) throw new RestaurantNotFoundException()

    if (!aRestaurant.owner.equals(owner._id)) throw new RestaurantAuthorizedException()

    const deletingDishIndex = aRestaurant.dishes.findIndex((dish) => dish.name === deletingDishName)

    if (deletingDishIndex < 0) throw new DishNotFoundException()

    aRestaurant.dishes.splice(deletingDishIndex, 1)
    await aRestaurant.save()

    return aRestaurant.dishes
  }
}
