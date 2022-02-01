import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi'
import { RestaurantModule } from './restaurant'
import { UserModule } from './user/user.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './shared/filter/http-exception.filter'
import { JwtModule } from './jwt/jwt.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.dev'
          : process.env.NODE_ENV === 'prod'
          ? '.env.prod'
          : '.env.test',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
        DB_URL: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
      family: 4,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    RestaurantModule,
    UserModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
