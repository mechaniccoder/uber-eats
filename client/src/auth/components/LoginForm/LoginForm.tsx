import { LoginFields } from '@/auth/interfaces'
import { Button, FormControl, FormHelperText, FormLabel, Input } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  loading?: boolean
  onLogin: (data: LoginFields) => void
}

export const LoginForm: React.FC<Props> = ({ loading = false, onLogin: onSubmit }) => {
  const { handleSubmit, formState, register } = useForm<LoginFields>()

  const { errors } = formState

  const _onSubmit: SubmitHandler<LoginFields> = (data) => {
    onSubmit(data)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(_onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          {...register('email', {
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          data-testid="email-input"
        />
        {errors.email && (
          <FormHelperText
            error
            role="alert"
            data-testid="email-error-message"
            aria-invalid={!!errors.email}
          >
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register('password', {
            required: { value: true, message: 'Password is required' },
            maxLength: {
              value: 16,
              message: 'Password must be at most 16 characters',
            },
          })}
          data-testid="password-input"
        />
        {errors.password && (
          <FormHelperText
            error
            role="alert"
            data-testid="password-error-message"
            aria-invalid={!!errors.password}
          >
            {errors.password.message}
          </FormHelperText>
        )}
      </FormControl>

      <Button type="submit">{loading ? 'loading...' : 'Login'}</Button>
    </form>
  )
}
