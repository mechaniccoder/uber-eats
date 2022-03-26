import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { ResponseDto } from 'src/shared/dto/response.dto'
import { Category } from '../category.schema'

@InputType()
export class CategoryDto extends PickType(Category, ['slug'], InputType) {}

@ObjectType()
export class CategoryRes extends ResponseDto {
  @Field((type) => Category, { nullable: true })
  data?: Category
}
