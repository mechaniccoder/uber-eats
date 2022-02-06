import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserResolver } from './user.resolver'
import { User, UserSchema } from './schema/user.schema'
import { UserService } from './user.service'
import { VerificationService } from './verification.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, UserResolver, VerificationService],
  exports: [UserService],
})
export class UserModule {}
