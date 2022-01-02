import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { Document, Model } from 'mongoose'

export interface RestaurantModel extends Model<Restaurant & Document> {}

@ObjectType()
@Schema()
export class Restaurant {
  // write "returns" for expression
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  @IsString()
  name: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Boolean, { defaultValue: false })
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  @IsOptional()
  isVegan: boolean

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  @IsString()
  address: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  @IsString()
  ownerName: string
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)
