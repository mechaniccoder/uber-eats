import { Field, ArgsType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ArgsType()
export class CreateRestaurantDto {
  @IsString()
  @Field()
  name: string
}
