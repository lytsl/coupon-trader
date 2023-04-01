import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthUser, LoginDTO } from 'features/auth/api'
import { axios } from 'lib/axios'
import React from 'react'

const userKey = ['authenticated-user']

export type UserUpdateDTO = {
  email: string
  username: string
}

const useLogin = () => {
  const queryClient = useQueryClient()

  const setUser = React.useCallback(
    (data: AuthUser) => queryClient.setQueryData(userKey, data),
    [queryClient],
  )

  return useMutation(async (data: UserUpdateDTO) => {
    const response = await axios.put('/user/me', data)
  })
}
