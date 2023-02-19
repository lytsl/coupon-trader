import * as React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

type ContentLayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: ContentLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
