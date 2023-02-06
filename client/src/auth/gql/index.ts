import { gql } from '@/gql'

export const CREATE_USER = gql(/* GraphQL */ `
  mutation CreateUser($createUserDto: CreateUserDto!) {
    createUser(createUserArgs: $createUserDto) {
      ok
      error
      data {
        id
        email
        role
      }
    }
  }
`)

export const VERIFY_CODE = gql(/* GraphQL */ `
  mutation VerifyCode($verifyCodeDto: VerifyCodeDto!) {
    verifyCode(verifyCodeArgs: $verifyCodeDto) {
      ok
      error
      data
    }
  }
`)
