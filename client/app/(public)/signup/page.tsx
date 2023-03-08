'use client'

import { SignUpForm, VerificationForm } from '@/auth/components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInPage() {
  const router = useRouter()

  const [signUpStep, setSignUpStep] = useState<'signUp' | 'verification'>('signUp')
  const [email, setEmail] = useState('')

  const handleSignUp = ({ email }: { email: string }) => {
    setSignUpStep('verification')
    setEmail(email)
  }

  const handleVerify = () => {
    router.push('/login')
  }

  return (
    <div className="justify-cent items-center bg-gray-800">
      <section className="flex max-w-[360px] flex-col gap-3 px-3">
        {signUpStep === 'signUp' && <SignUpForm onSignUp={handleSignUp} />}
        {signUpStep === 'verification' && (
          <VerificationForm email={email} onVerify={handleVerify} />
        )}
      </section>
    </div>
  )
}
