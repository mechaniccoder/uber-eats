import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Order } from '../order.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class GetOrderInput {
  @Field((type) => String)
  orderId: string
}

@ObjectType()
export class GetOrderRes extends ResponseDto {
  @Field((type) => Order, { nullable: true })
  data?: Order
}
