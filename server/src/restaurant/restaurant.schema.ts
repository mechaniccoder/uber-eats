import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'

export interface RestaurantModel extends Model<Restaurant & Document> {}

@ObjectType({})
@Schema()
export class Restaurant {
  @Field((type) => String)
  @Prop({
    required: true,
    type: String,
  })
  name: string

  static findByse(this: RestaurantModel) {
    return true
  }
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
