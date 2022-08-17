import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class OrderupdatedInput {
  @Field((type) => String)
  orderId: string
}
