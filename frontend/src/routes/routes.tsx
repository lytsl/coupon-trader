import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'

import { Landing } from 'features/static/Landing'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Box, Center, Loader } from '@mantine/core'
import { Layout } from 'components/Layout'
import { lazyImport } from 'lib/lazyImports'
import storage from 'lib/storage'
import { NotFoundAuth } from 'features/static/NotFoundAuth'
import { NotFound } from 'features/static/NotFound'
import { ProfileRoutes } from 'features/user/routes'
import { ForgotPassword } from 'components/ForgotPassword'
import { Inquiry } from 'features/inquiry/Inquiry'
import { AuthRequired } from 'features/static/AuthRequired'
import { Login } from 'features/auth/Login'
import { CheckEmailApp } from 'features/auth/CheckEmailApp'
import { VerifyEmail } from 'features/auth/VerifyEmail'
import { AddCoupon } from 'features/coupon/AddCoupon'
import { CouponDetails } from 'features/coupon/CouponDetails'
import { Explore } from 'features/coupon/Explore'
import { Register } from 'features/auth/Register'
import { Navbar } from 'features/user/components/Navbar'
import { BoughtCoupons } from 'features/user/components/BoughtCoupons'
import { ChangePassword } from 'features/user/components/ChangePassword'
import { ForSellCoupons } from 'features/user/components/ForSellCoupons'
import { Profile } from 'features/user/components/Profile'
import { SuccessPayment } from 'features/payment/SuccessPayment'
import { FailedPayment } from 'features/payment/Failedpayment'

const { AuthRoutes } = lazyImport(() => import('../features/auth/routes'), 'AuthRoutes')

const App = () => {
  const auth = storage.getToken() == null ? false : true
  return (
    <Layout hasLoggedIn={auth}>
      <Suspense
        fallback={
          <Box h="100svh" w="100svw">
            <Center>
              <Loader size="xl" />
            </Center>
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  )
}

const protectedRoutes = [
  {
    path: '/app/*',
    element: <App />,
    children: [
      // ProfileRoutes,
      {
        path: 'user/*',
        element: <Navbar />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'password', element: <ChangePassword /> },
          { path: 'buy', element: <BoughtCoupons /> },
          { path: 'sell', element: <ForSellCoupons /> },
        ],
      },
      { path: 'coupon/add/', element: <AddCoupon /> },
      // { path: '*', element: <Navigate to="." /> },
    ],
  },
  { path: '/checkout-success/:id', element: <SuccessPayment /> },
  { path: '/checkout-fail', element: <FailedPayment /> },
  { path: '/confirmation', element: <CheckEmailApp /> },
  { path: '/verify_email/:token', element: <VerifyEmail /> },
  {
    path: '/auth/*',
    element: <NotFoundAuth />,
  },
]

const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  { path: '/app/coupon/*', element: <Login /> },

  { path: '/app/*', element: <AuthRequired /> },
]

const commonRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/*',
    element: <App />,
    children: [
      { path: 'inquiry/', element: <Inquiry /> },
      { path: 'explore/', element: <Explore /> },
      { path: 'coupon/:id', element: <CouponDetails /> },
    ],
  },
  {
    path: '/auth/forgot',
    element: <ForgotPassword />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export const AppRoutes = () => {
  const auth = storage.getToken() == null ? false : true

  const routes = auth ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}

const tempRoutes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth">
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/app">
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <>
            {/* <Navbar /> */}
            <Outlet />
            {/* <ImageSlider /> */}
          </>
        }
      >
        // routes for authenticated users where navbar & image slider should be displayed
        {/* <Route path="/home" element={<Home />}></Route> */}
      </Route>

      <Route element={<Outlet />}>
        // routes where navbar & image slider is not rendered
        {/* <Route path="/Signup" element={<Signup />}></Route> */}
        {/* <Route path="/Login" element={<Login />}></Route> */}
      </Route>
    </Routes>
  </BrowserRouter>
)
