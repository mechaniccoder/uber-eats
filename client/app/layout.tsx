'use client'

import { GET_ME } from '@/auth/gql'
import { GetMeQuery, GetMeQueryVariables } from '@/gql/graphql'
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import { Box, CircularProgress, CssBaseline } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
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
        <body className="flex min-h-screen flex-col bg-gray-800 text-white">
          <AuthRoute>
            <main className="flex-1">{children}</main>
          </AuthRoute>
        </body>
      </html>
    </ApolloProvider>
  )
}

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const publicPath = ['/login', '/signup']
  const pathname = usePathname()
  const router = useRouter()

  const isPublicPath = useCallback(
    (pathname: string | null) => {
      if (pathname === null) {
        return false
      }

      return publicPath.includes(pathname)
    },
    [publicPath, pathname],
  )

  const { loading, error, data } = useQuery<GetMeQuery, GetMeQueryVariables>(GET_ME, {
    onCompleted: ({ me }) => {
      const { ok } = me

      if (!ok) {
        router.push('/login')
      }
    },
  })

  if (isPublicPath(pathname)) {
    return <>{children}</>
  }

  if (loading || data === undefined) {
    return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}
