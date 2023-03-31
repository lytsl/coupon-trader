import { Navigate, useRoutes } from 'react-router-dom'

import { Landing } from 'features/static/Landing'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Center, Loader } from '@mantine/core'
import { Layout } from 'components/Layout'
import { lazyImport } from 'lib/lazyImports'
import storage from 'lib/storage'
import { NotFoundAuth } from 'features/static/NotFoundAuth'
import { NotFound } from 'features/static/NotFound'
import { ProfileRoutes } from 'features/user/routes'
import { ForgotPassword } from 'components/ForgotPassword'
import { CouponCard } from 'features/explore/CouponCard'
import { Explore } from 'features/explore/Explore'
import { Inquiry } from 'features/inquiry/Inquiry'
import { AddCoupon } from 'features/coupon/AddCoupon'
import { AuthRequired } from 'features/static/AuthRequired'
import { Login } from 'features/auth/Login'

const { AuthRoutes } = lazyImport(
  () => import('../features/auth/routes'),
  'AuthRoutes',
)

const App = () => {
  return (
    <Layout hasLoggedIn={true}>
      <Suspense
        fallback={
          <Center>
            <Loader size="xl" />
          </Center>
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
      ProfileRoutes,
      { path: 'coupon/add/', element: <AddCoupon /> },
      // { path: '*', element: <Navigate to="." /> },
    ],
  },
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
  { path: 'inquiry/', element: <Inquiry /> },
  { path: 'explore/', element: <Explore /> },
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
