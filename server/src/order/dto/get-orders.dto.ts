import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Order, OrderStatus } from '../order.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class GetOrdersInput {
  @Field((type) => OrderStatus, { nullable: true })
  status?: OrderStatus
}

@ObjectType()
export class GetOrdersRes extends ResponseDto {
  @Field((type) => [Order], { nullable: true })
  data?: Order[]
}
