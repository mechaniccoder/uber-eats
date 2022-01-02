import { Field, ArgsType } from '@nestjs/graphql'
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator'

@ArgsType()
export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  name: string

  @IsBoolean()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Boolean)
  isVegan: boolean

  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  address: string

  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  ownerName: string
}
