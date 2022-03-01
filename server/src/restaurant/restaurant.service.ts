import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/user/schema/user.schema'
import { Category, CategoryModel } from './category.schema'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { Restaurant, RestaurantModel } from './restaurant.schema'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: RestaurantModel,
    @InjectModel(Category.name) private categoryModel: CategoryModel,
  ) {}

  async create(authUser: User, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const categoryName = createRestaurantDto.categoryName.trim().toLowerCase()
    const categorySlug = categoryName.replace(/\s+/g, '-')

    const newRestaurant = new this.restaurantModel(createRestaurantDto)
    newRestaurant.owner = authUser

    const existingCategory = await this.categoryModel.findOne({ slug: categorySlug })
    if (existingCategory) {
      newRestaurant.category = existingCategory
    } else {
      const newCategory = await this.categoryModel.create({
        name: categoryName,
        slug: categorySlug,
      })
      newRestaurant.category = newCategory
    }

    await newRestaurant.save()

    return newRestaurant
  }
}
