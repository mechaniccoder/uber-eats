import { ObjectId } from 'mongoose'
import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Restaurant } from '../restaurant.schema'
import { IsMongoId, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateRestaurantDto extends PartialType(Restaurant, InputType) {
  @Field((type) => String)
  @IsMongoId()
  @IsNotEmpty()
  _id: ObjectId
}
