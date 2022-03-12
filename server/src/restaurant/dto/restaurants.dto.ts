/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Restaurant } from '../restaurant.schema'

@InputType()
export class RestaurantsDto extends PartialType(
  OmitType(Restaurant, ['category', 'owner', 'id'], InputType),
) {
  @Field((type) => String, { nullable: true })
  category?: string

  @Field((type) => String, { nullable: true })
  owner?: string
}

@ObjectType()
export class RestaurantsRes extends ResponseDto {
  @Field((type) => [Restaurant], { nullable: true })
  data?: Restaurant[]
}
