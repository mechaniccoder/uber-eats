'use client'

import { SignUpForm, VerificationForm } from '@/auth/components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInPage() {
  const router = useRouter()

  const [signUpStep, setSignUpStep] = useState<'signUp' | 'verification'>('verification')

  const handleSignUp = () => {
    setSignUpStep('verification')
  }

  const handleVerificationComplete = (value: string) => {
    // mutation
  }

  return (
    <div className="justify-cent items-center bg-gray-800">
      <section className="flex max-w-[360px] flex-col gap-3 px-3">
        {signUpStep === 'signUp' && <SignUpForm onSignUp={handleSignUp} />}
        {signUpStep === 'verification' && <VerificationForm />}
      </section>
    </div>
  )
}
