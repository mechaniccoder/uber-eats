'use client'

import { SubmitHandler } from 'react-hook-form'
import { SignUpForm } from '../../src/auth/components'

type SignUpFields = {
  email: string
  password: string
}

export default function SignInPage() {
  const handleSubmit: SubmitHandler<SignUpFields> = (data) => {
    console.log(data)
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
