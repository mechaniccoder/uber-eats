/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Order } from '../order.schema'
import { ResponseDto } from '../../shared/dto/response.dto'
import { Types } from 'mongoose'

@InputType()
export class CreateOrderInput {
  @Field((type) => String)
  restaurantId: Types.ObjectId

  @Field((type) => [String])
  dishIds: Types.ObjectId[]
}

@ObjectType()
export class CreateOrderRes extends ResponseDto {
  @Field((type) => Order, { nullable: true })
  data?: Order
}
