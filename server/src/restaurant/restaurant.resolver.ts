import { Query, Resolver } from '@nestjs/graphql'
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
}
