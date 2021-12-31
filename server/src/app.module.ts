import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { join } from 'path'
import { RestaurantModule } from './restaurant/restaurant.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'uber',
      authSource: 'uber',
      family: 4,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
