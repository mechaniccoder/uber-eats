/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Restaurant } from '../restaurant.schema'

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id', 'owner']) {}

@ObjectType()
export class CreateRestaurantRes extends ResponseDto {
  @Field((type) => Restaurant, { nullable: true })
  data?: Restaurant
}
