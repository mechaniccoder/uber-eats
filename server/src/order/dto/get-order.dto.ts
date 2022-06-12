import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Order } from '../order.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class GetOrderInput extends PickType(Order, ['status'], InputType) {}

@ObjectType()
export class GetOrderRes extends ResponseDto {
  @Field((type) => [Order], { nullable: true })
  data?: Order[]
}
