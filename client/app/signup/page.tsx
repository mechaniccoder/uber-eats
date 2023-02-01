'use client'

import { useRouter } from 'next/navigation'
import { SignUpForm } from '../../src/auth/components'

export default function SignInPage() {
  const router = useRouter()

  const handleSignUp = () => {
    router.push('/login')
  }

  return (
    <div className="justify-cent items-center bg-gray-800">
      <section className="flex max-w-[360px] flex-col gap-3 px-3">
        <h1 className="text-2xl text-white">Sign up</h1>
        <SignUpForm onSignUp={handleSignUp} />
      </section>
    </div>
  )
}
