/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Restaurant } from '../restaurant.schema'

@InputType()
export class SearchRestaurantsInput {
  @Field((type) => String)
  query: string
}

@ObjectType()
export class SearchRestaurantsRes extends ResponseDto {
  @Field((type) => [Restaurant], { nullable: true })
  data?: Restaurant[]
}
