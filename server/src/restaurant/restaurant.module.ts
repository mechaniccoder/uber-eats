import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Restaurant, RestaurantSchema } from './restaurant.schema'
import { RestaurantResolver } from './restaurant.resolver'

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  providers: [RestaurantResolver],
})
export class RestaurantModule {}
