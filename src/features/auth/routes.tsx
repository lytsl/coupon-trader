import { Route, Routes } from 'react-router-dom'
import { ForgotPassword } from './ForgotPassword'

import { Login } from './Login'
import { Register } from './Register'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot" element={<ForgotPassword />} />
    </Routes>
  )
}
