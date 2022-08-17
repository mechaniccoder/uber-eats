/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Restaurant } from '../restaurant/restaurant.schema'
import { User } from '../user/schema/user.schema'

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Cooked = 'Cooked',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
})

@ObjectType()
@Schema({
  timestamps: true,
})
export class Order {
  @Field((type) => String)
  id: string

  @Field((type) => User)
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  customer: Types.ObjectId

  @Field((type) => User, { nullable: true })
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  driver?: Types.ObjectId

  @Field((type) => Restaurant)
  @Prop({
    type: Types.ObjectId,
    ref: Restaurant.name,
    required: true,
  })
  restaurant: Types.ObjectId

  @Field((type) => [String])
  @Prop({
    type: [String],
    required: true,
  })
  dishes: string[]

  @Field((type) => OrderStatus)
  @Prop({
    type: String,
    required: true,
    enum: [OrderStatus.Pending, OrderStatus.Cooking, OrderStatus.PickedUp, OrderStatus.Delivered],
  })
  status: OrderStatus

  @Field((type) => Float)
  @Prop({
    type: Number,
    min: 0,
    required: true,
  })
  total: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)
