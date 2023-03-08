import { GET_ME } from '@/auth/gql'
import { GetMeQuery, GetMeQueryVariables } from '@/gql/graphql'
import { useQuery } from '@apollo/client'
import { Box, CircularProgress } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

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

  const { loading, data } = useQuery<GetMeQuery, GetMeQueryVariables>(GET_ME, {
    skip: isPublicPath(pathname),
    onCompleted: ({ me }) => {
      const { ok } = me

      if (!ok && !isPublicPath(pathname)) {
        router.push('/login')
      }
    },
    onError: () => {
      if (!isPublicPath(pathname)) {
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
