import * as React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Successpayment } from 'features/coupon/Successpayment'
import { Failedpayment } from 'features/coupon/Failedpayment'
// import { useAuth } from 'lib/auth'

type ContentLayoutProps = {
  children: React.ReactNode
  hasLoggedIn: boolean
}

export const Layout = ({ children, hasLoggedIn }: ContentLayoutProps) => {
  const [show, setShow] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShow(false)
      } else {
        setShow(true)
      }
      setLastScrollY(window.scrollY)
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <>
      <Header hasLoggedIn={hasLoggedIn} sx={show ? { top: 0 } : {}} />
      {children}
      <Footer />
      <Successpayment />
      {/* <Failedpayment /> */}
    </>
  )
}
