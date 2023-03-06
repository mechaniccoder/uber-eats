import { createUserAlreadyExistError } from '@/auth/gql/mock'
import { handlers } from '@/common/mocks/handlers'
import { screen } from '@testing-library/react'
import { customRender } from '@utils/test-utils'
import { setupServer } from 'msw/node'
import { SignUpForm } from './SignUpForm'

const server = setupServer(...handlers)

const setup = () => {
  const handleSignUp = jest.fn()

  const utils = customRender(<SignUpForm onSignUp={handleSignUp} />)
  const emailInput = screen.getByRole('textbox', { name: 'Enter your email' })
  const passwordInput = screen.getByPlaceholderText(/enter your password/i)
  const submitButton = screen.getByRole('button', { name: /Continue/i })

  return {
    emailInput,
    passwordInput,
    submitButton,
    handleSignUp,
    ...utils,
  }
}

beforeAll(() => server.listen())

beforeEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('SignUpForm', () => {
  const testEmail = 'test@gmail.com'
  const testPassword = 'testPassword'
  it('should call onSignUp', async () => {
    const { user, emailInput, passwordInput, submitButton, handleSignUp } = setup()

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    expect(handleSignUp).toHaveBeenCalledTimes(1)
    expect(handleSignUp).toHaveBeenCalledWith({
      email: testEmail,
    })
  })

  it('should render required error message', async () => {
    const { user, emailInput, submitButton } = setup()

    expect(emailInput).toBeInTheDocument()

    await user.click(submitButton)

    expect(await screen.findByTestId('email-error-message')).toBeInTheDocument()
  })

  it('should render password error message', async () => {
    const { user, emailInput, passwordInput, submitButton } = setup()

    await user.type(emailInput, testEmail)
    await user.click(submitButton)

    expect(await screen.findByTestId('password-error-message')).toBeInTheDocument()
  })

  it('Loading state should be rendered on submit', async () => {
    server.use(createUserAlreadyExistError(1000))

    const { user, emailInput, passwordInput, submitButton } = setup()

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    expect(await screen.findByText(/loading/i)).toBeInTheDocument()
  })

  it('Error message should be rendered if user already exist', async () => {
    server.use(createUserAlreadyExistError())

    const { user, emailInput, passwordInput, submitButton } = setup()

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    const userAlreadyExistErrorMessage = await screen.findByText(/user already exist/i)

    expect(userAlreadyExistErrorMessage).toBeInTheDocument()
  })
})

export {}
