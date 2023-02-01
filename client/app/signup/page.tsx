'use client'

import { useMutation } from '@apollo/client'
import { gql } from 'gql'
import { CreateUserMutation, CreateUserMutationVariables, UserRole } from 'gql/graphql'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { SignUpForm } from '../../src/auth/components'

const CREATE_USER = gql(/* GraphQL */ `
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

type SignUpFields = {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()

  const [signUp, { data }] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CREATE_USER,
    {
      onCompleted: ({ createUser }) => {
        const { ok, error } = createUser

        if (ok) {
          router.push('/login')
        } else {
          // @todo handle error
        }
      },
    },
  )

  const handleSubmit: SubmitHandler<SignUpFields> = (data) => {
    const { email, password } = data

    signUp({
      variables: {
        createUserDto: {
          email,
          password,
          role: UserRole.Customer,
        },
      },
    })
  }

  return (
    <div className="justify-cent items-center bg-gray-800">
      <section className="flex max-w-[360px] flex-col gap-3 px-3">
        <h1 className="text-2xl text-white">Sign up</h1>
        <SignUpForm onSignUp={handleSubmit} />
      </section>
    </div>
  )
}
