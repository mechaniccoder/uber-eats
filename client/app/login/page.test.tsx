import { loginNetworkError, loginNotFoundError } from '@/auth/gql/mock'
import { customRender } from '@/common/utils'
import { screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import LoginPage from './page'

const server = setupServer()

beforeAll(() => server.listen())

beforeEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('LoginPage', () => {
  const testEmail = 'test@gmail.com'
  const testPassword = 'testPassword'

  it('should render snackbar whnen login error', async () => {
    server.use(loginNotFoundError())

    const { user } = customRender(<LoginPage />)

    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    const loginErrorSnackbar = await screen.findByTestId('login-error-snackbar')

    expect(loginErrorSnackbar).toBeInTheDocument()
  })

  it('should render snackbar when network error', async () => {
    server.use(loginNetworkError())

    const { user } = customRender(<LoginPage />)

    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    const loginErrorSnackbar = await screen.findByTestId('login-network-error-snackbar')

    expect(loginErrorSnackbar).toBeInTheDocument()
  })
})

export {}
