'use client'

import { Box } from '@mui/material'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <>
      <Box component={'header'}>This is a header</Box>
      <Box component={'main'} flex={1}>
        {children}
      </Box>
    </>
  )
}
