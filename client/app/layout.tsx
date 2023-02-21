'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { CssBaseline } from '@mui/material'
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
      <CssBaseline />
      <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <body className="flex min-h-screen flex-col bg-gray-800 text-white">
          <header></header>
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ApolloProvider>
  )
}
