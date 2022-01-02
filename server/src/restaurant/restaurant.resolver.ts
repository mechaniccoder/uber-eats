import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { Restaurant } from './restaurant.schema'
import { RestaurantService } from './restaurant.service'

@Resolver()
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  // write "returns" for expression
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.findAll()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Restaurant)
  async createRestaurant(
    @Args('createRestaurantArgs') createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    try {
      return this.restaurantService.create(createRestaurantDto)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Restaurant)
  async updateRestaurant(@Args('updateRestaurantArgs') updateRestaurant: UpdateRestaurantDto) {
    return this.restaurantService.update(updateRestaurant)
  }
}
