import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './order.schema'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'
import { Restaurant, RestaurantSchema } from '../restaurant/restaurant.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
