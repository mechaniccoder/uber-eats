import { AppBar, IconButton, Toolbar } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'

export const Header = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar variant="dense">
        <IconButton sx={{ mr: 2 }}>
          <GiHamburgerMenu size={20} color="black" />
        </IconButton>

        <Link href="/" passHref>
          <Image width={134} height={34} src="/icons/ubereats-logo.svg" alt="logo" />
        </Link>
      </Toolbar>
    </AppBar>
  )
}
