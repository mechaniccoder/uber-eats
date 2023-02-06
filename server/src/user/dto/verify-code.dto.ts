import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { ResponseDto } from '../../shared/dto/response.dto'
import { Verification } from '../schema/verification.schema'

@ObjectType()
export class VerifyCodRes extends ResponseDto {
  @Field((type) => Boolean, { nullable: true })
  data?: boolean
}

@InputType()
export class VerifyCodeDto extends PickType(Verification, ['code'], InputType) {
  @Field((type) => String)
  email: string
}
