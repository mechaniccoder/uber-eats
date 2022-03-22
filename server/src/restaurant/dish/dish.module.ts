import { Module } from '@nestjs/common'
import { DishResolver } from './dish.resolver'
import { DishService } from './dish.service'
import { RestaurantModule } from '../restaurant.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Restaurant, RestaurantSchema } from '../restaurant.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
    RestaurantModule,
  ],
  providers: [DishResolver, DishService],
})
export class DishModule {}
