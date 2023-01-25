'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './globals.css'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <body className="flex flex-col">
          <header></header>
          <main className="flex flex-1 items-center justify-center bg-gray-800">{children}</main>
        </body>
      </html>
    </ApolloProvider>
  )
}
