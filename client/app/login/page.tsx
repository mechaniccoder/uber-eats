'use client'

import { LoginForm } from '@/auth/components'
import { Container } from '@mui/material'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <Container maxWidth="xs" className="m-auto">
        <LoginForm />
      </Container>
    </div>
  )
}
