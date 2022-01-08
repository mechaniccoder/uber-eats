import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'

type UserRole = 'customer' | 'delivery' | 'owner'

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
    required: true,
  })
  role: UserRole
}
