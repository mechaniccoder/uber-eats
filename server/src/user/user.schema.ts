import { Field, ObjectType, OmitType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { IsEnum } from 'class-validator'
import { BadGatewayException } from '@nestjs/common'

enum UserRole {
  customer = 'customer',
  delivery = 'delivery',
  owner = 'owner',
}

registerEnumType(UserRole, {
  name: 'UserRole',
})

export interface UserDocument extends User, Document<User> {}

export interface UserModel extends Model<UserDocument> {
  comparePassword(aPassword: string, hashedPassword): Promise<boolean>
}

@ObjectType()
@Schema({
  timestamps: true,
})
export class User {
  @Field((type) => String)
  id: ObjectId

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
  @IsEnum(UserRole)
  role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)

@ObjectType()
export class UserWithoutPassword extends OmitType(User, ['password']) {}

UserSchema.pre('save', async function () {
  const user = this as User & Document
  if (!user.isModified('password')) return

  user.password = await bcrypt.hash(user.password, 10)
})

UserSchema.statics.comparePassword = async function (aPassword: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(aPassword, hashedPassword)
  } catch (err) {
    throw new BadGatewayException('Error occurr while comparing password')
  }
}
