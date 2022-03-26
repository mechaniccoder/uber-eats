import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Order } from '../order.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class CreateOrderInput extends PickType(Order, ['dishes'], InputType) {
  @Field((type) => String)
  restaurantId: string
}

@ObjectType()
export class CreateOrderRes extends ResponseDto {
  @Field((type) => Order)
  data?: Order
}
