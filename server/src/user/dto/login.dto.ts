import { InputType, PickType } from '@nestjs/graphql'
import { User } from '../user.schema'
import { Field, ObjectType } from '@nestjs/graphql/dist/extra/graphql-model-shim'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class LoginDto extends PickType(User, ['email', 'password'], InputType) {}

@ObjectType()
export class LoginRes extends ResponseDto {
  @Field((type) => Boolean, { nullable: true })
  data?: boolean
}
