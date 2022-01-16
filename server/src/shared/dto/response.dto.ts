import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export abstract class ResponseDto {
  @Field((type) => Boolean)
  ok: boolean

  @Field((type) => String, { nullable: true })
  error?: string

  abstract data?: any
}
