import { customRender } from '@/common/utils/test-utils'
import { screen } from '@testing-library/react'
import { LoginForm } from './LoginForm'

const setup = () => {
  const handleLogin = jest.fn()
  const utils = customRender(<LoginForm onLogin={handleLogin} />)

  const emailInput = screen.getByTestId('email-input')
  const passwordInput = screen.getByTestId('password-input')
  const submitButton = screen.getByRole('button', { name: /login/i })

  return {
    emailInput,
    passwordInput,
    submitButton,
    handleLogin,
    ...utils,
  }
}

describe('LoginForm', () => {
  const testEmail = 'test@gmail.com'
  const testPassword = 'test1234'

  it('when user login with wrong id, then show error message', async () => {
    const { user, submitButton, handleLogin } = setup()

    await user.click(submitButton)

    const emailErrorMessage = await screen.findByTestId('email-error-message')
    const passwordErrorMessage = await screen.findByTestId('password-error-message')

    expect(emailErrorMessage).toHaveTextContent('Email is required')
    expect(passwordErrorMessage).toHaveTextContent('Password is required')
  })

  it('when user login success, handle login is called', async () => {
    const { user, submitButton, emailInput, passwordInput, handleLogin } = setup()

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)

    await user.click(submitButton)

    expect(handleLogin).toBeCalledWith({ email: testEmail, password: testPassword })
  })
})

export {}
