import { Route, Routes } from 'react-router-dom'
import { CheckEmailApp } from './CheckEmailApp'
import { ForgotPassword } from '../../components/ForgotPassword'

import { Login } from './Login'
import { Register } from './Register'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}
