import { Field } from '@nestjs/graphql'
import { Order } from '../order.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

export class GetOrderInput {
  @Field((type) => String)
  orderId: string
}

export class GetOrderRes extends ResponseDto {
  @Field((type) => Order, { nullable: true })
  data?: Order
}
