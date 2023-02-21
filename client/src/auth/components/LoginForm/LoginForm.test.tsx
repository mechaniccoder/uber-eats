import { customRender } from '@/common/utils/test-utils'
import { screen } from '@testing-library/react'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('when user login with wrong id, then show error message', async () => {
    const handleLogin = jest.fn()
    const { user } = customRender(<LoginForm onLogin={handleLogin} />)

    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.click(submitButton)

    const emailErrorMessage = await screen.findByTestId('email-error-message')
    const passwordErrorMessage = await screen.findByTestId('password-error-message')

    expect(emailErrorMessage).toHaveTextContent('Email is required')
    expect(passwordErrorMessage).toHaveTextContent('Password is required')
  })

  it.todo('when user login success, then go to main page')
})

export {}
