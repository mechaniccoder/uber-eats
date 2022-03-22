import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type DishDocument = Document & Dish

@ObjectType()
@Schema({
  _id: false,
})
export class Dish {
  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  name: string

  @Field((type) => Int)
  @Prop({
    type: Number,
    required: true,
  })
  price: number

  @Field((type) => String, { nullable: true })
  @Prop({
    type: String,
  })
  img?: string

  @Field((type) => String, { nullable: true })
  @Prop({
    type: String,
    maxlength: 100,
  })
  description: string
}

export const DishSchema = SchemaFactory.createForClass(Dish)
