'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './globals.css'

const client = new ApolloClient({
  uri: 'http://localhost:3000/',
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
        <head />
        <body>
          <header className="h-0 min-h-full min-w-0 space-x-3 bg-red-200 hover:space-x-0 focus:w-0"></header>
          <div>
            hello hihi hioioeajfioefjiojesfio jaiosfjieaso<span>hello</span>
          </div>
          {children}
        </body>
      </html>
    </ApolloProvider>
  )
}
