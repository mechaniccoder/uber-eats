'use client'

import { LoginForm } from '@/auth/components'
import { LOGIN } from '@/auth/gql'
import { LoginFields } from '@/auth/interfaces'
import { useDisclosure } from '@/common/hooks'
import { LogInMutation, LogInMutationVariables } from '@/gql/graphql'
import { useMutation } from '@apollo/client'
import { Alert, Container, Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [login, { loading, data: loginData, error: loginError }] = useMutation<
    LogInMutation,
    LogInMutationVariables
  >(LOGIN)
  const [open, setOpen] = useState(false)
  const graphqlErrorSnackBarProps = useDisclosure()
  const loginErrorSnackBarProps = useDisclosure()

  const router = useRouter()

  const handleLogin = (data: LoginFields) => {
    login({
      variables: {
        loginDto: data,
      },
      onCompleted: ({ login }) => {
        const { ok, data, error } = login

        if (ok && data) {
          const accessToken = data

          localStorage.setItem('accessToken', accessToken)
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
          open={graphqlErrorSnackBarProps.open}
          autoHideDuration={5000}
          onClose={graphqlErrorSnackBarProps.onClose}
        >
          <Alert severity="error" onClose={graphqlErrorSnackBarProps.onClose}>
            {loginData?.login.error}
          </Alert>
        </Snackbar>
      )}

      {loginError && (
        <Snackbar
          open={loginErrorSnackBarProps.open}
          autoHideDuration={5000}
          onClose={loginErrorSnackBarProps.onClose}
        >
          <Alert severity="error" onClose={loginErrorSnackBarProps.onClose}>
            {loginError?.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}
