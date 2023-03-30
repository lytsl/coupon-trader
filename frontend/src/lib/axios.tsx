import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import Axios, { InternalAxiosRequestConfig } from 'axios'

import { API_URL } from './config'
import storage from './storage'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken()
  config.headers = config.headers ?? {}
  if (token) {
    config.headers.authorization = `${token}`
  }
  config.withCredentials = false
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}

export const axios = Axios.create({
  baseURL: API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error)
    const message = error.response?.data?.message || error.message
    notifications.show({
      withCloseButton: true,
      autoClose: 5000,
      title: 'Error',
      message: message,
      color: 'red',
      icon: <IconX />,
    })
    return Promise.reject(error)
  },
)
