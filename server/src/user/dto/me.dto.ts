import { Field, ObjectType } from '@nestjs/graphql'
import { ResponseDto } from '../../shared/dto/response.dto'
import { UserWithoutPassword } from '../schema/user.schema'

@ObjectType()
export class MeRes extends ResponseDto {
  @Field((type) => UserWithoutPassword, { nullable: true })
  data?: UserWithoutPassword
}
