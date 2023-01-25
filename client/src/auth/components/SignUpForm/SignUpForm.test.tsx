import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignUpForm } from './SignUpForm'

describe('SignUpForm', () => {
  const testEmail = 'test@gmail.com'
  const testPassword = 'testPassword'
  it('should call onSubmit', async () => {
    const user = userEvent.setup()

    const handleSignUp = jest.fn()
    const { getByRole, getByPlaceholderText } = render(<SignUpForm onSignUp={handleSignUp} />)

    const emailInput = getByRole('textbox', { name: 'Enter your email' })
    const passwordInput = getByPlaceholderText(/enter your password/i)
    const submitButton = getByRole('button', { name: /Continue/i })

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    expect(handleSignUp).toHaveBeenCalledTimes(1)
    expect(handleSignUp).toHaveBeenCalledWith({
      email: testEmail,
      password: testPassword,
    })
  })

  it('should render required error message', async () => {
    const user = userEvent.setup()

    const handleSignUp = jest.fn()
    render(<SignUpForm onSignUp={handleSignUp} />)

    const emailInput = screen.getByRole('textbox', { name: 'Enter your email' })
    const submitButton = screen.getByRole('button', { name: /Continue/i })

    expect(emailInput).toBeInTheDocument()

    await user.click(submitButton)

    expect(await screen.findByTestId('email-error-message')).toBeInTheDocument()
  })

  it('should render password error message', async () => {
    const user = userEvent.setup()

    const handleSignUp = jest.fn()
    render(<SignUpForm onSignUp={handleSignUp} />)

    const emailInput = screen.getByRole('textbox', { name: 'Enter your email' })
    const submitButton = screen.getByRole('button', { name: /Continue/i })

    await user.type(emailInput, testEmail)
    await user.click(submitButton)

    expect(await screen.findByTestId('password-error-message')).toBeInTheDocument()
  })
})
export {}
