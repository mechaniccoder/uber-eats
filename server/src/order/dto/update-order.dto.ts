import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import mongoose from 'mongoose'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Order } from '../order.schema'

@InputType()
export class UpdateOrderInput extends PickType(Order, ['status'], InputType) {
  @Field((type) => String)
  @Transform((params) => new mongoose.Types.ObjectId(params.value))
  id: mongoose.Types.ObjectId
}

@ObjectType()
export class UpdateOrderRes extends ResponseDto {
  @Field((type) => Order, { nullable: true })
  data?: Order
}
