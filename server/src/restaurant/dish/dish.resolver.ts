import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Dish } from './dish.schema'
import { Response } from 'src/shared/factory/response.factory'
import { CreateDishInput, CreateDishRes } from './dto/create-dish.dto'
import { DishService } from './dish.service'
import { Role } from '../../auth/role.decorator'
import { User, UserRole } from '../../user/schema/user.schema'
import { AuthUser } from '../../auth/auth-user.decorator'

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Role(UserRole.owner)
  @Mutation((returns) => CreateDishRes)
  async createDish(
    @AuthUser() owner: User,
    @Args('createDishInput') createDishInput: CreateDishInput,
  ) {
    const dish = await this.dishService.create(owner, createDishInput)
    return Response.create(true, null, dish)
  }
}
