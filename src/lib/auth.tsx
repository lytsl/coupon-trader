import { Loader } from '@mantine/core'

import {
  UserResponse,
  LoginDTO,
  RegisterDTO,
  AuthUser,
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
} from 'features/auth/api'
import storage from 'lib/storage'

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data
  storage.setToken(jwt)
  return user
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser()
    return data
  }
  return null
}

async function loginFn(data: LoginDTO) {
  const response = await loginWithEmailAndPassword(data)
  const user = await handleUserResponse(response)
  return user
}

async function registerFn(data: RegisterDTO) {
  const response = await registerWithEmailAndPassword(data)
  const user = await handleUserResponse(response)
  return user
}

async function logoutFn() {
  storage.clearToken()
  window.location.assign(window.location.origin as unknown as string)
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader size="xl" />
      </div>
    )
  },
}

// export const { AuthProvider, useAuth } = initReactQueryAuth<
//   AuthUser | null,
//   unknown,
//   LoginCredentialsDTO,
//   RegisterCredentialsDTO
// >(authConfig);
