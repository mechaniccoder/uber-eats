/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Category } from '../category.schema'

@ObjectType()
export class AllCategoriesRes extends ResponseDto {
  @Field((type) => [Category], { nullable: true })
  data?: Category[]
}
