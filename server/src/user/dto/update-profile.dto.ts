import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { User, UserWithoutPassword } from '../user.schema'
import { ResponseDto } from '../../shared/dto/response.dto'

@InputType()
export class UpdateProfileDto extends PartialType(
  PickType(User, ['email', 'password'], InputType),
) {}

@ObjectType()
export class UpdateProfileRes extends ResponseDto {
  @Field((type) => UserWithoutPassword, { nullable: true })
  data?: UserWithoutPassword
}
