'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SignUpForm } from '../../src/auth/components'

export default function SignInPage() {
  const router = useRouter()

  const [signUpStep, setSignUpStep] = useState<'signUp' | 'verification'>('signUp')

  const handleSignUp = () => {
    setSignUpStep('verification')
  }

  return (
    <div className="justify-cent items-center bg-gray-800">
      <section className="flex max-w-[360px] flex-col gap-3 px-3">
        {signUpStep === 'signUp' && <SignUpForm onSignUp={handleSignUp} />}
        {/* {signUpStep === 'verification' && <VerificationForm />} */}
      </section>
    </div>
  )
}
