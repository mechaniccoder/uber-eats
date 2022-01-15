import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { User } from '../user.schema'

export class CreateUserDto extends PickType(User, ['email', 'password', 'role'], InputType) {}

@ObjectType()
export class CreateUserRes {
  @Field((type) => Boolean)
  ok: boolean

  @Field((type) => String, { nullable: true })
  error?: string
}
