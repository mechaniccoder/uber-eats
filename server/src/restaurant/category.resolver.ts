/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver, ResolveField, Int, Parent } from '@nestjs/graphql'
import { Response } from 'src/shared/factory/response.factory'
import { Category } from './category.schema'
import { CategoryService } from './category.service'
import { AllCategoriesRes } from './dto/all-categories.dto'
import { RestaurantService } from './restaurant.service'

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly restaurantService: RestaurantService,
  ) {}

  @Query((type) => AllCategoriesRes)
  async allCategories(): Promise<AllCategoriesRes> {
    const categories = await this.categoryService.findAll()
    return Response.create(true, null, categories)
  }

  @ResolveField((type) => Int)
  async restaurantsCount(@Parent() category: Category): Promise<number> {
    console.log(category)
    const restaurantCount = await this.restaurantService.count({ category })
    return restaurantCount
  }
}
;``
