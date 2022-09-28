import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Order } from '../order.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class TakeOrderInput extends PickType(Order, ['id'], InputType) {}

@ObjectType()
export class TakeOrderRes extends ResponseDto {
  @Field((type) => Order, { nullable: true })
  data: Order
}
