import {
  UserResponse,
  LoginDTO,
  RegisterDTO,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  AuthUser,
} from 'features/auth/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import storage from 'lib/storage'
import React from 'react'

async function handleUserResponse(response: UserResponse) {
  const data: AuthUser = {
    ...response,
    avatar: response.username.slice(0, 2).toUpperCase(),
  }
  storage.setToken(response.accessToken)
  return data
}

const userKey = ['authenticated-user']

const useUser = () =>
  useQuery(['authenticated-user'], async () => {
    if (storage.getToken()) {
      const data = true
      return data
    }
    return null
  })

const useLogin = () => {
  const queryClient = useQueryClient()

  const setUser = React.useCallback(
    (data: AuthUser) => queryClient.setQueryData(userKey, data),
    [queryClient],
  )

  return useMutation(
    async (data: LoginDTO) => {
      const response = await loginWithEmailAndPassword(data)
      const user: AuthUser = await handleUserResponse(response)
      return user
    },
    {
      onSuccess: (user) => setUser(user),
    },
  )
}

const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RegisterDTO) => {
      console.log(data)
      const response = await registerWithEmailAndPassword(data)
    },
  })
}

const useLogout = () => {
  const queryClient = useQueryClient()

  const setUser = React.useCallback(
    (data: any) => queryClient.setQueryData(userKey, data),
    [queryClient],
  )
  return useMutation({
    mutationFn: async () => {
      storage.clearToken()
      window.location.assign(window.location.origin as unknown as string)
      await logout()
    },
    onSuccess: () => setUser(null),
  })
}

const AuthLoader = ({
  children,
  renderLoading,
  renderUnauthenticated,
}: {
  children: React.ReactNode
  renderLoading: () => JSX.Element
  renderUnauthenticated?: () => JSX.Element
}) => {
  const { isSuccess, isFetched, status, data } = useUser()
  if (isSuccess) {
    if (renderUnauthenticated && !data) {
      return renderUnauthenticated()
    }
    return <>{children}</>
  }

  if (!isFetched) {
    return renderLoading()
  }

  return <div>Unhandled status: {status}</div>
}

export { useUser, useLogin, useRegister, useLogout, AuthLoader }
