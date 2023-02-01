import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

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

export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: createWrapper(), ...options })
