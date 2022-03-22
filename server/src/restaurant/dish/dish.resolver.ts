import { Mutation, Resolver } from '@nestjs/graphql'
import { Dish } from './dish.schema'
import { Response } from 'src/shared/factory/response.factory'
import { CreateDishRes } from './dto/create-dish.dto'
import { DishService } from './dish.service'

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Mutation((returns) => CreateDishRes)
  async createDish() {
    // const dish = await this.dishService.create()
    return Response.create(true, null, true)
  }
}
