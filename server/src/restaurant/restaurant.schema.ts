/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model, Schema as MSchema, Types } from 'mongoose'
import { User } from 'src/user/schema/user.schema'
import { Category } from './category/category.schema'
import { Dish, DishSchema } from './dish/dish.schema'

export interface RestaurantModel extends Model<Restaurant & Document> {}

@ObjectType()
@Schema({ timestamps: true })
export class Restaurant {
  @Field((type) => String)
  id: string

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  name: string

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  img: string

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  address: string

  @Field((type) => Category)
  @Prop({
    type: MSchema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category

  @Field((type) => User)
  @Prop({
    type: MSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: Types.ObjectId

  @Field((type) => [Dish])
  @Prop({
    type: [DishSchema],
  })
  dishes: Types.DocumentArray<Dish>

  @Field((type) => Boolean)
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isPromoted: boolean

  @Field((type) => Date, { nullable: true })
  @Prop({
    type: Date,
  })
  promotedUntil?: Date
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
