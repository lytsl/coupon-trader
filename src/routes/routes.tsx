// import { useRoutes } from 'react-router-dom'

// import { Landing } from 'features/static/Landing'
// // import { useAuth } from 'lib/auth'

// import { Suspense } from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// import { Loader } from '@mantine/core'
// import { Layout } from 'components/Layout'
// import { lazyImport } from 'lib/lazyImports'

// const { AuthRoutes } = lazyImport(() => import('features/auth'), 'routes')

// const App = () => {
//   return (
//     <Layout>
//       <Suspense
//         fallback={
//           <div className="h-full w-full flex items-center justify-center">
//             <Loader size="xl" />
//           </div>
//         }
//       >
//         <Outlet />
//       </Suspense>
//     </Layout>
//   )
// }

// export const protectedRoutes = [
//   {
//     path: '/app',
//     element: <App />,
//     children: [
//       // { path: '/inquiry/*', element: <Inquiry /> },
//       // { path: '/users', element: <Users /> },
//       // { path: '/profile', element: <Profile /> },
//       // { path: '/', element: <Dashboard /> },
//       // { path: '*', element: <Navigate to="." /> },
//     ],
//   },
// ]

// const publicRoutes = [
//   {
//     path: '/auth/*',
//     element: <AuthRoutes />,
//   },
// ]

// export const AppRoutes = () => {
//   // const auth = useAuth()
//   const tempAuth = false

//   const commonRoutes = [{ path: '/', element: <Landing /> }]

//   // const routes = auth.user ? protectedRoutes : publicRoutes
//   const routes = tempAuth ? protectedRoutes : publicRoutes

//   const element = useRoutes([...routes, ...commonRoutes])

//   return <>{element}</>
// }
export {}
