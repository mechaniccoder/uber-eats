'use client'

import { LoginForm } from '@/auth/components'
import { LOGIN } from '@/auth/gql'
import { LoginFields } from '@/auth/interfaces'
import { useDisclosure } from '@/common/hooks'
import { setLocalStorageItem } from '@/common/utils/storage'
import { LogInMutation, LogInMutationVariables } from '@/gql/graphql'
import { useMutation } from '@apollo/client'
import { Alert, Container, Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [login, { loading, data: loginData, error: loginError }] = useMutation<
    LogInMutation,
    LogInMutationVariables
  >(LOGIN)
  const graphqlErrorSnackBarProps = useDisclosure()
  const loginErrorSnackBarProps = useDisclosure()
  const router = useRouter()

  const handleLogin = (data: LoginFields) => {
    login({
      variables: {
        loginDto: data,
      },
      onCompleted: ({ login }) => {
        const { ok, data } = login

        if (ok && data) {
          const accessToken = data

          setLocalStorageItem('accessToken', accessToken)
          router.push('/')
        } else {
          loginErrorSnackBarProps.onOpen()
        }
      },
      onError: (err) => {
        graphqlErrorSnackBarProps.onOpen()
      },
    })
  }

  return (
    <div className="flex min-h-screen">
      <Container maxWidth="xs" className="m-auto">
        <LoginForm loading={loading} onLogin={handleLogin} />
      </Container>

      {loginData?.login.error && (
        <Snackbar
          open={loginErrorSnackBarProps.open}
          autoHideDuration={5000}
          onClose={loginErrorSnackBarProps.onClose}
          data-testid="login-error-snackbar"
        >
          <Alert severity="error" onClose={loginErrorSnackBarProps.onClose}>
            {loginData?.login.error}
          </Alert>
        </Snackbar>
      )}

      {loginError && (
        <Snackbar
          open={graphqlErrorSnackBarProps.open}
          autoHideDuration={5000}
          onClose={graphqlErrorSnackBarProps.onClose}
          data-testid="login-network-error-snackbar"
        >
          <Alert severity="error" onClose={graphqlErrorSnackBarProps.onClose}>
            {loginError?.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}
