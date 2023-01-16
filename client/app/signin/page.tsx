import { useForm } from 'react-hook-form'

type SignUpForm = {
  email: string
  password: string
}

export default function SignInPage() {
  const { register, formState, handleSubmit } = useForm<SignUpForm>()
  const { errors } = formState

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <div className="justify-cent items-center bg-gray-800">
      <div className="mx-auto flex max-w-[360px] flex-col gap-3 rounded-lg bg-white p-6">
        <h1>전화번호나 이메일이 어떻게 되시나요?</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
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
          />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              maxLength: { value: 20, message: 'Password must be at most 20 characters' },
            })}
            className="min-h-[3rem] rounded-lg bg-gray-200 px-3 py-[0.625rem] focus:outline-none focus:ring-2"
            type="text"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
            placeholder="Enter your password"
            aria-label="Enter your password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <button
            type="submit"
            className="btn-primary bg-black text-white ring-sky-400 focus:outline-none focus:ring-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
