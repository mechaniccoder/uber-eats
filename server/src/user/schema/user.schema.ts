/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, OmitType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model, ObjectId } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { IsEnum } from 'class-validator'
import { BadGatewayException } from '@nestjs/common'
import { Verification, VerificationDocument, VerificationSchema } from './verification.schema'

export enum UserRole {
  customer = 'customer',
  delivery = 'delivery',
  owner = 'owner',
}

registerEnumType(UserRole, {
  name: 'UserRole',
})

export type UserDocument = User & Document

export interface UserModel extends Model<UserDocument> {
  comparePassword(aPassword: string, hashedPassword): Promise<boolean>
}

@ObjectType()
@Schema({
  timestamps: true,
})
export class User {
  @Field((type) => String)
  id: string

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
    select: false,
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

  @Field((type) => Verification)
  @Prop({
    type: VerificationSchema,
    default: () => ({}),
  })
  verification: VerificationDocument
}

export const UserSchema = SchemaFactory.createForClass(User)

@ObjectType()
export class UserWithoutPassword extends OmitType(User, ['password']) {}

UserSchema.pre('save', async function () {
  const user = this as UserDocument
  if (!user.isModified('password')) return

  user.password = await bcrypt.hash(user.password, 10)
})

UserSchema.pre('findOneAndUpdate', async function () {
  const _update = this.getUpdate()
  const password = _update['password']
  if (!password) return

  const hashedPassword = await bcrypt.hash(password, 10)
  this.setUpdate({ ..._update, password: hashedPassword })
})

UserSchema.statics.comparePassword = async function (aPassword: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(aPassword, hashedPassword)
  } catch (err) {
    throw new BadGatewayException(err.message)
  }
}
