import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { User } from '../user.schema'

@InputType()
export class CreateUserDto extends PickType(User, ['email', 'password', 'role'], InputType) {}

@ObjectType()
export class CreateUserRes extends ResponseDto {
  @Field((type) => User)
  data: User
}
