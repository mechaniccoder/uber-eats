import { CREATE_USER } from '@/auth/gql'
import { CreateUserMutation, CreateUserMutationVariables, UserRole } from '@/gql/graphql'
import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'

type SignUpFields = {
  email: string
  password: string
}

type SignUpFormProps = {
  onSignUp: () => void
}
export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const { register, formState, handleSubmit } = useForm<SignUpFields>()
  const { errors } = formState

  const [signUp, { data: createUserRes, loading: signUpLoading }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      const { ok, error } = createUser

      if (ok) {
        onSignUp()
      } else {
        // @todo handle error
      }
    },
  })

  const onSubmit: SubmitHandler<SignUpFields> = (data) => {
    const { email, password } = data

    signUp({
      variables: {
        createUserDto: {
          email: email,
          password,
          role: UserRole.Customer,
        },
      },
    })
  }

  return (
    <div className="mx-auto flex  flex-col gap-2 rounded-lg border border-transparent bg-white p-6">
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
            <p
              className="text-red-500"
              role="alert"
              data-testid="email-error-message"
              aria-invalid={!!errors.email}
            >
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
            <p
              role="alert"
              className="text-red-500"
              data-testid="password-error-message"
              aria-invalid={!!errors.password}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary bg-black text-white ring-sky-400 focus:outline-none focus:ring-2"
        >
          {signUpLoading ? 'Loading...' : 'Continue'}
        </button>
        {createUserRes?.createUser.error === 'ExistException' && (
          <p className="text-red-500">User already exist</p>
        )}
      </form>
    </div>
  )
}
