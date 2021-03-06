/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type DishDocument = Document & Dish

@InputType('DishInput', { isAbstract: true })
@ObjectType()
@Schema()
export class Dish {
  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
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

  @Field((type) => [String])
  @Prop({
    type: [String],
  })
  options: Types.Array<string>
}

export const DishSchema = SchemaFactory.createForClass(Dish)
