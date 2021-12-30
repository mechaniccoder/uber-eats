import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { Restaurant } from './restaurant.entity'

@Resolver()
export class RestaurantResolver {
  @Query((returns) => Boolean)
  isPizzaGood(): boolean {
    return true
  }

  @Query((returns) => Restaurant)
  myRestaurant(): Restaurant {
    return {
      name: 'seunghwan',
    }
  }
}
