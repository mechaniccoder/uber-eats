'use client'

import { gql, useMutation } from '@apollo/client'
import { SubmitHandler } from 'react-hook-form'
import { SignUpForm } from '../../src/auth/components'

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $role: UserRole!) {
    createUser(createUserArgs: { email: $email, password: $password, role: $role }}) {
      ok
      error
      data
    }
  }
`

type SignUpFields = {
  email: string
  password: string
}

export default function SignInPage() {
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP)

  const handleSubmit: SubmitHandler<SignUpFields> = (data) => {
    const { email, password } = data

    signUp({
      variables: {
        email,
        password,
        role: 'customer',
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
