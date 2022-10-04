import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserResolver } from './user.resolver'
import { User, UserSchema } from './schema/user.schema'
import { UserService } from './user.service'
import { VerificationService } from './verification.service'
import { PaymentService } from './payment/payment.service'
import { PaymentResolver } from './payment/payment.resolver'
import { Restaurant, RestaurantSchema } from 'src/restaurant/restaurant.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  providers: [UserService, UserResolver, VerificationService, PaymentResolver, PaymentService],
  exports: [UserService],
})
export class UserModule {}
