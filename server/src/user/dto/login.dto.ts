import { InputType, PickType, Field, ObjectType } from '@nestjs/graphql'
import { User } from '../user.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class LoginDto extends PickType(User, ['email', 'password'], InputType) {}

@ObjectType()
export class LoginRes extends ResponseDto {
  @Field((type) => String, { nullable: true })
  data?: string
}
