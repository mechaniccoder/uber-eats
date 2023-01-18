import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignUpForm } from './SignUpForm'

describe('SignUpForm', () => {
  it('should call onSubmit', async () => {
    const user = userEvent.setup()

    const handleSignUp = jest.fn()
    const { getByRole, getByPlaceholderText } = render(<SignUpForm onSignUp={handleSignUp} />)

    const emailInput = getByRole('textbox', { name: 'Enter your email' })
    const passwordInput = getByPlaceholderText(/enter your password/i)
    const submitButton = getByRole('button', { name: /Continue/i })

    const testEmail = 'test@gmail.com'
    const testPassword = 'testPassword'

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    expect(handleSignUp).toHaveBeenCalledTimes(1)
    expect(handleSignUp).toHaveBeenCalledWith({
      email: testEmail,
      password: testPassword,
    })
  })

  it('should render required error message', () => {
    const handleSignUp = jest.fn()
    const { getByRole } = render(<SignUpForm onSignUp={handleSignUp} />)

    const emailInput = getByRole('textbox', { name: 'Enter your email' })
    const passwordInput = getByRole('textbox', { name: 'Enter your password' })
    const submitButton = getByRole('button', { name: /Continue/i })

    expect(emailInput).toBeInTheDocument()

    userEvent.click(submitButton)
  })
})
export {}
