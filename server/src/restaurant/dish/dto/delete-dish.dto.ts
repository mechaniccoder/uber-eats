import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Dish } from '../dish.schema'
import { ResponseDto } from '../../../shared/dto/response.dto'

@InputType()
export class DeleteDishInput extends PickType(Dish, ['name']) {
  @Field((type) => String)
  restaurantId: string
}

@ObjectType()
export class DeleteDishRes extends ResponseDto {
  @Field((type) => [Dish], { nullable: true })
  data?: Dish[]
}
