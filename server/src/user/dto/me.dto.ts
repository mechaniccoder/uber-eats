import { Field, ObjectType } from '@nestjs/graphql'
import { ResponseDto } from '../../shared/dto/response.dto'
import { User } from '../user.schema'

@ObjectType()
export class MeRes extends ResponseDto {
  @Field((type) => User, { nullable: true })
  data?: User
}
