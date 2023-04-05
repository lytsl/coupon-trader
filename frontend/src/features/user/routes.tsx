import { ChangePassword } from './components/ChangePassword'
import { Navbar } from './components/Navbar'
import { Profile } from './components/Profile'
import { BoughtCoupons } from './components/BoughtCoupons'
import { ForSellCoupons } from './components/ForSellCoupons'

export const ProfileRoutes = {
  path: 'user/*',
  element: <Navbar />,
  children: [
    { path: 'profile', element: <Profile /> },
    { path: 'password', element: <ChangePassword /> },
    // { path: 'add', element: <AddCoupon /> },
    { path: 'buy', element: <BoughtCoupons /> },
    { path: 'sell', element: <ForSellCoupons /> },

    // { path: '/inquiry/*', element: <Inquiry /> },
    // { path: 'dashboard', element: <Dashboard /> },
    // { path: '*', element: <Navigate to="." /> },
  ],
}
