/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthUser } from 'src/auth/auth-user.decorator'
import { Role } from 'src/auth/role.decorator'
import { Response } from 'src/shared/factory/response.factory'
import { User } from 'src/user/schema/user.schema'
import { CreateRestaurantDto, CreateRestaurantRes } from './dto/create-restaurant.dto'
import { EditRestaurantDto, EditRestaurantRes } from './dto/edit-restaurant.dto'
import { RestaurantService } from './restaurant.service'

@Resolver()
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Role('owner')
  @Mutation((returns) => CreateRestaurantRes)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('createRestaurantArgs') createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantRes> {
    const newRestaurant = await this.restaurantService.create(authUser, createRestaurantDto)
    return Response.create(true, null, newRestaurant)
  }

  @Role('owner')
  @Mutation((returns) => EditRestaurantRes)
  async editRestaurant(
    @AuthUser() authUser: User,
    @Args('editRestaurantArgs') editRestaurantDto: EditRestaurantDto,
  ): Promise<EditRestaurantRes> {
    // const editedRestaurant = await this.restaurantService.edit()
    // return Response.create(true, null, editedRestaurant)
    return {
      ok: true,
    }
  }
}
