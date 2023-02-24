import { Center, Loader } from '@mantine/core'
import * as React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
// import { useAuth } from 'lib/auth'

type ContentLayoutProps = {
  children: React.ReactNode
  hasLoggedIn: boolean
}

export const Layout = ({ children, hasLoggedIn }: ContentLayoutProps) => {
  return (
    <>
      <Header hasLoggedIn={hasLoggedIn} />
      {children}
      <Footer />
    </>
  )
}
