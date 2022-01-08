import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Model } from 'mongoose'

type UserRole = 'customer' | 'delivery' | 'owner'

export interface UserModel extends Model<User & Document> {}

@ObjectType()
@Schema({
  timestamps: true,
})
export class User {
  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  email: string

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
  })
  password: string

  @Field()
  @Prop({
    type: String,
    enum: ['customer', 'delivery', 'owner'],
    required: true,
  })
  role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)
