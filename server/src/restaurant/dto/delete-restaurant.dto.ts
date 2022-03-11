/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Restaurant } from '../restaurant.schema'

@InputType()
export class DeleteRestaurantDto extends PickType(Restaurant, ['id'], InputType) {}

@ObjectType()
export class DeleteRestaurantRes extends ResponseDto {
  @Field((type) => Boolean, { nullable: true })
  data?: boolean
}
