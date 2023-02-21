import { customRender } from '@/common/utils/test-utils'
import { screen } from '@testing-library/react'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  const testEmail = 'test@gmail.com'
  const testPassword = 'test1234'

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

  it('when user login success, handle login is called', async () => {
    const handleLogin = jest.fn()
    const { user } = customRender(<LoginForm onLogin={handleLogin} />)

    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)

    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.click(submitButton)

    expect(handleLogin).toBeCalledWith({ email: testEmail, password: testPassword })
  })
})

export {}
