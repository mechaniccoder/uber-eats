import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Restaurant, RestaurantSchema } from './restaurant.schema'
import { RestaurantResolver } from './restaurant.resolver'
import { RestaurantService } from './restaurant.service'
import { Category, CategorySchema } from './category/category.schema'
import { CategoryResolver } from './category/category.resolver'
import { CategoryService } from './category/category.service'
import { DishModule } from './dish/dish.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  providers: [RestaurantResolver, RestaurantService, CategoryResolver, CategoryService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
