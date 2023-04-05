import { ChangePassword } from './components/ChangePassword'
import { Navbar } from './components/Navbar'
import { Profile } from './components/Profile'
import { UserCouponsGrid } from './components/UserCouponsGrid'

export const ProfileRoutes = {
  path: 'user/*',
  element: <Navbar />,
  children: [
    { path: 'profile', element: <Profile /> },
    { path: 'password', element: <ChangePassword /> },
    // { path: 'add', element: <AddCoupon /> },
    { path: 'buy', element: <UserCouponsGrid /> },

    // { path: '/inquiry/*', element: <Inquiry /> },
    // { path: 'dashboard', element: <Dashboard /> },
    // { path: '*', element: <Navigate to="." /> },
  ],
}
