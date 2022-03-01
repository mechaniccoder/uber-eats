/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, OmitType, PickType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Restaurant } from '../restaurant.schema'

@InputType()
export class CreateRestaurantDto extends PickType(Restaurant, ['name', 'address', 'img']) {
  @Field((type) => String)
  categoryName: string
}

@ObjectType()
export class CreateRestaurantRes extends ResponseDto {
  @Field((type) => Restaurant, { nullable: true })
  data?: Restaurant
}
