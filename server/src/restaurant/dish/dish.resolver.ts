import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Dish } from './dish.schema'
import { Response } from 'src/shared/factory/response.factory'
import { CreateDishInput, CreateDishRes } from './dto/create-dish.dto'
import { DishService } from './dish.service'
import { Role } from '../../auth/role.decorator'
import { UserRole } from '../../user/schema/user.schema'

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Role(UserRole.owner)
  @Mutation((returns) => CreateDishRes)
  async createDish(@Args('createDishInput') createDishInput: CreateDishInput) {
    const dish = await this.dishService.create(createDishInput)
    return Response.create(true, null, true)
  }
}
