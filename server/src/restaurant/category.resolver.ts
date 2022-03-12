/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver, ResolveField, Int, Parent, Args } from '@nestjs/graphql'
import { Response } from 'src/shared/factory/response.factory'
import { Category } from './category.schema'
import { CategoryService } from './category.service'
import { AllCategoriesRes } from './dto/all-categories.dto'
import { CategoryDto, CategoryRes } from './dto/category.dto'
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
    const restaurantCount = await this.restaurantService.count({ category })
    return restaurantCount
  }

  @Query((type) => CategoryRes)
  async category(@Args('categoryArgs') categoryDto: CategoryDto): Promise<CategoryRes> {
    const category = await this.categoryService.findBySlug(categoryDto)
    return Response.create(true, null, category)
  }
}
