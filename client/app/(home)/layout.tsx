'use client'

import { AuthRoute } from '@/auth/components'
import { Header } from '@/common/components/Header/Header'
import { Box } from '@mui/material'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <AuthRoute>
      <Header />
      <Box component={'main'} flex={1}>
        {children}
      </Box>
    </AuthRoute>
  )
}
