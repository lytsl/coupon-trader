import { axios } from 'lib/axios'

export type AuthUser = {
  _id: string
  email: string
  username: string
  avatar: string
}

export type UserResponse = {
  _id: string
  username: string
  email: string
  emailverified: boolean
  accessToken: string
}

export type LoginDTO = {
  username: string
  password: string
}

export type RegisterDTO = {
  username: string
  email: string
  password: string
  cpassword: string
}

export type ResetPassDTO = {
  email: string
}

// export const getUser = (): Promise<AuthUser> => {
//   return axios.get('/user/' + )
// }

export const loginWithEmailAndPassword = (
  data: LoginDTO,
): Promise<UserResponse> => axios.post('/auth/login', data)

export const registerWithEmailAndPassword = (
  data: RegisterDTO,
): Promise<UserResponse> => axios.post('/auth/register', data)

export const sendRestPasswordEmail = (data: ResetPassDTO): Promise<any> =>
  axios.post('/auth/send_reset_email', data)

export function logout(): Promise<{ message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'success' })
    }, 1000)
  })
}
