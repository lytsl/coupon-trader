import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import Axios, { InternalAxiosRequestConfig } from 'axios'

import { API_URL } from './config'
import { showError } from './notifications'
import storage from './storage'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken()
  config.headers = config.headers ?? {}
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  // config.withCredentials = false
  config.headers['Content-Type'] = 'application/json'
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
    const message = error.response?.data || error.message
    showError(message)
    return Promise.reject(error)
  },
)
