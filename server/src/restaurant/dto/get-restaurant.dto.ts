/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Restaurant } from '../restaurant.schema'

@InputType()
export class GetRestaurantDto extends PickType(Restaurant, ['id'], InputType) {}

@ObjectType()
export class GetRestaurantRes extends ResponseDto {
  @Field((type) => Restaurant, { nullable: true })
  data?: Restaurant
}
