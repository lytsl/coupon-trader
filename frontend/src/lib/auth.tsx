import {
  UserResponse,
  LoginDTO,
  RegisterDTO,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  AuthUser,
  ResetPassDTO,
  sendRestPasswordEmail,
  sendVerificationEmail,
  getUser,
  verifyEmail,
} from 'features/auth/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import storage from 'lib/storage'
import React from 'react'
import { showSuccess } from './notifications'

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
  useQuery(userKey, async (): Promise<AuthUser | undefined> => {
    const user = getUser()
    console.log(user)
    return user ?? null
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
  return useMutation({
    mutationFn: async (data: RegisterDTO) => {
      console.log(data)
      const response = await registerWithEmailAndPassword(data)
    },
  })
}

const useResetPassword = () => {
  return useMutation(
    async (data: ResetPassDTO) => {
      const response = await sendRestPasswordEmail(data)
    },
    {
      onSuccess: (data) =>
        showSuccess(
          'An email has been send to your email address. Follow instructions to reset your password',
        ),
    },
  )
}

const useSendVerificationEmail = () => {
  return useMutation(
    async () => {
      const response = await sendVerificationEmail()
    },
    {
      onSuccess: (data) =>
        showSuccess(
          'An email has been send to your email address. Follow instructions to verify your email',
        ),
    },
  )
}

const useVerifyEmail = (token: string) => {
  return useQuery(
    [...userKey, token],
    async () => {
      const response = await verifyEmail(token)
      return response
    },

    {
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (data) => showSuccess('Your email was verified successfully'),
    },
  )
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

export {
  useUser,
  useLogin,
  useRegister,
  useResetPassword,
  useSendVerificationEmail,
  useVerifyEmail,
  useLogout,
  AuthLoader,
}
