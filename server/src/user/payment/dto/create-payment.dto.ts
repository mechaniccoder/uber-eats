import { Field, InputType, PickType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { User } from 'src/user/schema/user.schema'
import { Payment } from '../payments.schema'

@InputType()
export class CreatePaymentInput extends PickType(
  Payment,
  ['transactionId', 'restaurantId'],
  InputType,
) {}

export class CreatePaymentRes extends ResponseDto {
  @Field((type) => User, { nullable: true })
  data?: User
}
