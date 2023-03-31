import { createBrowserRouter, useRoutes } from 'react-router-dom'
import { AddCoupon } from '../coupon/AddCoupon'
import { ChangePassword } from './components/ChangePassword'
import { Navbar } from './components/Navbar'
import { Profile } from './components/Profile'

export const ProfileRoutes = {
  path: 'user/*',
  element: <Navbar />,
  children: [
    { path: 'profile', element: <Profile /> },
    { path: 'password', element: <ChangePassword /> },
    { path: 'add', element: <AddCoupon /> },
    // { path: '/inquiry/*', element: <Inquiry /> },
    // { path: 'dashboard', element: <Dashboard /> },
    // { path: '*', element: <Navigate to="." /> },
  ],
}
