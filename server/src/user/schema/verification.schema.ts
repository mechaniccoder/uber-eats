import { Document } from 'mongoose'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type VerificationDocument = Verification & Document

@ObjectType()
@Schema({
  _id: false,
})
export class Verification {
  @Field((type) => String)
  @Prop({
    type: String,
    default: '',
  })
  code: string

  @Field((type) => Boolean)
  @Prop({
    type: Boolean,
    default: false,
  })
  isVerified: boolean
}
export const VerificationSchema = SchemaFactory.createForClass(Verification)

VerificationSchema.pre('save', function () {
  const verification = this as VerificationDocument
  verification.code = generateVerificationCode()

  function generateVerificationCode() {
    return Math.random().toString(8).substring(2, 8)
  }
})
