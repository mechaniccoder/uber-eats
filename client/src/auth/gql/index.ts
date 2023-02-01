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
