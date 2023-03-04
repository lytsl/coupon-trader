import { useRoutes } from 'react-router-dom'

import { Landing } from 'features/static/Landing'

import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Center, Loader } from '@mantine/core'
import { Layout } from 'components/Layout'
import { lazyImport } from 'lib/lazyImports'
import storage from 'lib/storage'
import { Dashboard } from 'features/user/Dashboard'

const { AuthRoutes } = lazyImport(
  () => import('../features/auth/routes'),
  'AuthRoutes',
)
// const { Landing } = lazyImport(
//   () => import('features/static/Landing'),
//   'Landing',
// )

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
    path: '/app',
    element: <App />,
    children: [
      // { path: '/inquiry/*', element: <Inquiry /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]

const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
]

export const AppRoutes = () => {
  const auth = storage.getToken() == null ? false : true

  const commonRoutes = [
    {
      path: '/',
      element: <Landing />,
    },
  ]

  const routes = auth ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes, ...commonRoutes])
  // const element = useRoutes([
  //   ...protectedRoutes,
  //   ...publicRoutes,
  //   ...commonRoutes,
  // ])

  return <>{element}</>
}
