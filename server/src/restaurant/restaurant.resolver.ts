/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthUser } from 'src/auth/auth-user.decorator'
import { Response } from 'src/shared/factory/response.factory'
import { User } from 'src/user/schema/user.schema'
import { CreateRestaurantDto, CreateRestaurantRes } from './dto/create-restaurant.dto'
import { RestaurantService } from './restaurant.service'

@Resolver()
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Mutation((returns) => CreateRestaurantRes)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('createRestaurantArgs') createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantRes> {
    const newRestaurant = await this.restaurantService.create(authUser, createRestaurantDto)
    return Response.create(true, null, newRestaurant)
  }
}
