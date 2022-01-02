import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'

export interface RestaurantModel extends Model<Restaurant & Document> {}

@ObjectType()
@Schema()
export class Restaurant {
  // write "returns" for expression
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  @Prop({
    required: true,
    type: String,
  })
  name: string
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
