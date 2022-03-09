/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Restaurant } from '../restaurant.schema'
import { CreateRestaurantDto } from './create-restaurant.dto'

@InputType()
export class EditRestaurantDto extends PartialType(CreateRestaurantDto) {
  @Field((type) => String)
  id: string
}

@ObjectType()
export class EditRestaurantRes extends ResponseDto {
  @Field((type) => Restaurant, { nullable: true })
  data?: Restaurant
}
