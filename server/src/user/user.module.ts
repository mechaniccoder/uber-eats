import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { Restaurant, RestaurantSchema } from 'src/restaurant/restaurant.schema'
import { PaymentResolver } from './payment/payment.resolver'
import { PaymentService } from './payment/payment.service'
import { User, UserSchema } from './schema/user.schema'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { VerificationService } from './verification.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('JWT_PRIVATE_KEY')

        return {
          global: true,
          secret,
          signOptions: {
            expiresIn: '1d',
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, UserResolver, VerificationService, PaymentResolver, PaymentService],
  exports: [UserService, JwtModule],
})
export class UserModule {}
