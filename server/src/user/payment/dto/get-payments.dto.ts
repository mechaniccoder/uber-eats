import { Field, ObjectType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Payment } from '../payments.schema'

@ObjectType()
export class GetPaymentsRes extends ResponseDto {
  @Field((type) => [Payment], { defaultValue: [] })
  data?: Payment[]
}
