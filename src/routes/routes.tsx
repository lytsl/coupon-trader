import { useRoutes } from 'react-router-dom'

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
      ...ProfileRoutes,
      // { path: '/inquiry/*', element: <Inquiry /> },
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
]

const commonRoutes = [
  {
    path: '/',
    element: <Landing />,
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
