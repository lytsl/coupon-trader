import { useRoutes } from 'react-router-dom'

import { Landing } from 'features/static/Landing'

import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Center, Loader } from '@mantine/core'
import { Layout } from 'components/Layout'
import { lazyImport } from 'lib/lazyImports'
import storage from 'lib/storage'

const { AuthRoutes } = lazyImport(
  () => import('../features/auth'),
  'AuthRoutes',
)

const App = () => {
  return (
    <Layout>
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
      // { path: '/users', element: <Users /> },
      // { path: '/profile', element: <Profile /> },
      // { path: '/', element: <Dashboard /> },
      // { path: '*', element: <Navigate to="." /> },
    ],
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
    element: (
      <Layout>
        <Landing />
      </Layout>
    ),
  },
]

export const AppRoutes = () => {
  const auth = storage.getToken() == null ? false : true

  //   const commonRoutes = [{ path: '/', element: <Landing /> }]

  const routes = auth ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
export {}
