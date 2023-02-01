import { handlers } from '@/common/mocks/handlers'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { SignUpForm } from './SignUpForm'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

beforeEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('SignUpForm', () => {
  const testEmail = 'test@gmail.com'
  const testPassword = 'testPassword'
  it('should call onSignUp', async () => {
    const user = userEvent.setup()

    const handleSignUp = jest.fn()

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    })
    const { getByRole, getByPlaceholderText } = render(<SignUpForm onSignUp={handleSignUp} />, {
      wrapper: createWrapper(),
    })

    const emailInput = getByRole('textbox', { name: 'Enter your email' })
    const passwordInput = getByPlaceholderText(/enter your password/i)
    const submitButton = getByRole('button', { name: /Continue/i })

    await user.type(emailInput, testEmail)
    await user.type(passwordInput, testPassword)
    await user.click(submitButton)

    expect(handleSignUp).toHaveBeenCalledTimes(1)
    expect(handleSignUp).toHaveBeenCalledWith()
  })

  it('should render required error message', async () => {
    const user = userEvent.setup()

    const handleSignUp = jest.fn()
    render(<SignUpForm onSignUp={handleSignUp} />, {
      wrapper: createWrapper(),
    })

    const emailInput = screen.getByRole('textbox', { name: 'Enter your email' })
    const submitButton = screen.getByRole('button', { name: /Continue/i })

    expect(emailInput).toBeInTheDocument()

    await user.click(submitButton)

    expect(await screen.findByTestId('email-error-message')).toBeInTheDocument()
  })

  it('should render password error message', async () => {
    const user = userEvent.setup()

    const handleSignUp = jest.fn()
    render(<SignUpForm onSignUp={handleSignUp} />, {
      wrapper: createWrapper(),
    })

    const emailInput = screen.getByRole('textbox', { name: 'Enter your email' })
    const submitButton = screen.getByRole('button', { name: /Continue/i })

    await user.type(emailInput, testEmail)
    await user.click(submitButton)

    expect(await screen.findByTestId('password-error-message')).toBeInTheDocument()
  })
})

export {}

export const createWrapper = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            isLoggedIn: {
              read: () => {
                return localStorage.getItem('accessToken')
              },
            },
          },
        },
      },
    }),
  })

  return ({ children }: { children: React.ReactNode }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}
