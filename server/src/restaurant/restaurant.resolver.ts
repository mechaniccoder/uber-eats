/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthUser } from 'src/auth/auth-user.decorator'
import { Role } from 'src/auth/role.decorator'
import { Response } from 'src/shared/factory/response.factory'
import { User } from 'src/user/schema/user.schema'
import { CreateRestaurantDto, CreateRestaurantRes } from './dto/create-restaurant.dto'
import { DeleteRestaurantDto, DeleteRestaurantRes } from './dto/delete-restaurant.dto'
import { EditRestaurantDto, EditRestaurantRes } from './dto/edit-restaurant.dto'
import { GetRestaurantDto, GetRestaurantRes } from './dto/get-restaurant.dto'
import { RestaurantsDto, RestaurantsRes } from './dto/restaurants.dto'
import { SearchRestaurantsInput, SearchRestaurantsRes } from './dto/search-restaurants.dto'
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
    const editedRestaurant = await this.restaurantService.edit(authUser, editRestaurantDto)
    return Response.create(true, null, editedRestaurant)
  }

  @Role('owner')
  @Mutation((returns) => DeleteRestaurantRes)
  async deleteRestaurant(
    @AuthUser() owner: User,
    @Args('deleteRestaurantArgs') deleteRestaurantDto: DeleteRestaurantDto,
  ) {
    await this.restaurantService.delete(owner, deleteRestaurantDto)
    return Response.create(true, null, null)
  }

  @Query((returns) => RestaurantsRes)
  async restaurants(
    @Args('restaurantsArgs', { nullable: true }) restaurantsDto?: RestaurantsDto,
  ): Promise<RestaurantsRes> {
    const restaurants = await this.restaurantService.find(restaurantsDto)
    return Response.create(true, null, restaurants)
  }

  @Query((returns) => GetRestaurantRes)
  async getRestaurant(
    @Args('getRestaurantInput') getRestaurantInput: GetRestaurantDto,
  ): Promise<GetRestaurantRes> {
    const aRestaurant = await this.restaurantService.get(getRestaurantInput)
    return Response.create(true, null, aRestaurant)
  }

  @Query((returns) => SearchRestaurantsRes)
  async searchRestaurants(
    @Args('searchRestaurantsInput') searchRestaurantsInput: SearchRestaurantsInput,
  ): Promise<SearchRestaurantsRes> {
    const restaurants = await this.restaurantService.search(searchRestaurantsInput)
    return Response.create(true, null, restaurants)
  }
}
