'use client'

import { LoginForm } from '@/auth/components'
import { LOGIN } from '@/auth/gql'
import { LoginFields } from '@/auth/interfaces'
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
          handleOpen()
        }
      },
      onError: (err) => {
        handleOpen()
      },
    })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="flex min-h-screen">
      <Container maxWidth="xs" className="m-auto">
        <LoginForm loading={loading} onLogin={handleLogin} />
      </Container>

      {loginData?.login.error && (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose}>
            {loginData?.login.error}
          </Alert>
        </Snackbar>
      )}

      {loginError && (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose}>
            {loginError?.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}
