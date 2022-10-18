import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@InputType('PaymentInput', { isAbstract: true })
@ObjectType()
@Schema({
  _id: false,
})
export class Payment {
  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  transactionId: string

  @Field((type) => String)
  @Prop({
    type: Types.ObjectId,
    ref: 'Restaurants',
    required: true,
  })
  restaurantId: Types.ObjectId
}

export const paymentSchema = SchemaFactory.createForClass(Payment)
