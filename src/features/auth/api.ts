export type AuthUser = {
  id: string
  email: string
  name: string
  upi_id: string
  avatar: string
  // role: 'ADMIN' | 'USER'
}

export type UserResponse = {
  jwt: string
  user: AuthUser
}

export type LoginDTO = {
  email: string
  password: string
}

export type RegisterDTO = {
  email: string
  password: string
  name: string
  upi_id: string
}

const tempUser: AuthUser = {
  id: '123',
  email: 'temp@temp.com',
  name: 'temp_name',
  upi_id: 'temp_upi@temp',
  avatar: '',
}

const tempUserResponse: UserResponse = {
  jwt: 'jwtToken',
  user: tempUser,
}

export const getUser = (): Promise<AuthUser> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tempUser)
    }, 1000)
  })
}

export const loginWithEmailAndPassword = (
  data: LoginDTO,
): Promise<UserResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tempUserResponse)
    }, 1000)
  })
}

export const registerWithEmailAndPassword = (
  data: RegisterDTO,
): Promise<UserResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tempUserResponse)
    }, 1000)
  })
}
