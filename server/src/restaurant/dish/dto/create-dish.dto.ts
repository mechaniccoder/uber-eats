import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql'
import { Dish } from '../dish.schema'
import { ResponseDto } from '../../../shared/dto/response.dto'
import { Types } from 'mongoose'

@InputType()
export class CreateDishInput extends PartialType(Dish, InputType) {
  @Field((type) => String)
  restaurantId: Types.ObjectId
}
@ObjectType()
export class CreateDishRes extends ResponseDto {
  @Field((type) => Dish, { nullable: true })
  data?: Dish
}
