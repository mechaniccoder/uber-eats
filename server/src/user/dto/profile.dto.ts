import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { ResponseDto } from '../../shared/dto/response.dto'
import { UserWithoutPassword } from '../schema/user.schema'

@ObjectType()
export class ProfileRes extends ResponseDto {
  @Field((type) => UserWithoutPassword, { nullable: true })
  data?: UserWithoutPassword
}

@ArgsType()
export class ProfileArgs {
  @Field((type) => String)
  id: string
}
