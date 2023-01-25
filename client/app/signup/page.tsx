'use client'

import { useMutation } from '@apollo/client'
import { gql } from 'gql'
import { SubmitHandler } from 'react-hook-form'
import { SignUpForm } from '../../src/auth/components'

const SIGN_UP = gql(/* GraphQL */ `
  mutation SignUp($email: String!, $password: String!, $role: UserRole!) {
    createUser(createUserArgs: { email: $email, password: $password, role: $role }) {
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
  const [signUp] = useMutation(SIGN_UP)

  const handleSubmit: SubmitHandler<SignUpFields> = (data) => {
    const { email, password } = data

    signUp({
      variables: {
        email,
        password,
        role: 'customer',
      },
      onCompleted: (data) => {
        console.log(data)
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
