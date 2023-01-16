'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

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
        <SignUpForm onSubmit={handleSubmit} />
      </section>
    </div>
  )
}

type SignUpFormProps = {
  onSubmit: SubmitHandler<SignUpFields>
}
const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const { register, formState, handleSubmit, getFieldState } = useForm<SignUpFields>()
  const { errors } = formState

  return (
    <div className="mx-auto flex  flex-col gap-2 rounded-lg border border-transparent bg-white p-6 transition-transform focus-within:scale-105">
      <h1>전화번호나 이메일이 어떻게 되시나요?</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <input
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
              validate: {
                checkEmail: async (value) => {
                  await new Promise((res) => setTimeout(res, 2000))
                  console.log(value)
                  return value === 'test@gmail.com' || 'Email is already taken'
                },
              },
            })}
            className="min-h-[3rem] rounded-lg bg-gray-200 px-3 py-[0.625rem] focus:outline-none focus:ring-2"
            type="text"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
            placeholder="Enter your email"
            aria-label="Enter your email"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              maxLength: { value: 20, message: 'Password must be at most 20 characters' },
            })}
            className="min-h-[3rem] rounded-lg bg-gray-200 px-3 py-[0.625rem] focus:outline-none focus:ring-2"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
            placeholder="Enter your password"
            aria-label="Enter your password"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <p role="alert" className="text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary bg-black text-white ring-sky-400 focus:outline-none focus:ring-2"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
