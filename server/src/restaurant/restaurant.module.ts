import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Restaurant, RestaurantSchema } from './restaurant.schema'
import { RestaurantResolver } from './restaurant.resolver'
import { RestaurantService } from './restaurant.service'
import { Category, CategorySchema } from './category.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
