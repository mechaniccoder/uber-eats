/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model, Schema as MSchema } from 'mongoose'
import { User } from 'src/user/schema/user.schema'
import { Category } from './category.schema'

export interface RestaurantModel extends Model<Restaurant & Document> {}

@InputType({ isAbstract: true })
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

  @Field((type) => String)
  @Prop({
    type: MSchema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category

  @Field((type) => String)
  @Prop({
    type: MSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: User
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
