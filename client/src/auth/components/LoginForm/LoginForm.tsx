import { Button, FormControl, FormHelperText, FormLabel, Input } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginFields = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { handleSubmit, formState, register } = useForm<LoginFields>()

  const { errors } = formState

  console.log(errors)

  const onSubmit: SubmitHandler<LoginFields> = (data) => {}

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
        />
        {errors.password && (
          <FormHelperText
            error
            role="alert"
            data-testid="email-error-message"
            aria-invalid={!!errors.email}
          >
            {errors.password.message}
          </FormHelperText>
        )}
      </FormControl>

      <Button type="submit">Login</Button>
    </form>
  )
}
