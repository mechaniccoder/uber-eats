/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'

export interface CategoryModel extends Model<Category & Document> {}

@ObjectType()
@Schema({ timestamps: true })
export class Category {
  @Field((type) => String)
  id: string

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  name: string

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  img: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
