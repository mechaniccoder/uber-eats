'use client'

import { AuthRoute } from '@/auth/components'
import { getLocalStorageItem } from '@/common/utils/storage'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { CssBaseline } from '@mui/material'
import pkgJson from '../package.json'
import './globals.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: getLocalStorageItem('accessToken') ?? '',
    'client-versionn': pkgJson.version,
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <html lang="en">
        <body className="flex min-h-screen flex-col">
          <AuthRoute>{children}</AuthRoute>
        </body>
      </html>
    </ApolloProvider>
  )
}
