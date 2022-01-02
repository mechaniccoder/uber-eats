import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Restaurant, RestaurantSchema } from './restaurant.schema'
import { RestaurantResolver } from './restaurant.resolver'
import { RestaurantService } from './restaurant.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
