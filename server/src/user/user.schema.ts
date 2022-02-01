import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

enum UserRole {
  customer = 'customer',
  delivery = 'delivery',
  owner = 'owner',
}

registerEnumType(UserRole, {
  name: 'UserRole',
})

export interface UserModel extends Model<UserDocument> {}
interface UserDocument extends User, Document<User> {}

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

  @Field((type) => UserRole)
  @Prop({
    type: String,
    enum: ['customer', 'delivery', 'owner'],
    required: true,
  })
  role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function () {
  const user = this as User & Document
  if (!user.isModified('password')) return

  user.password = await bcrypt.hash(user.password, 10)
})
