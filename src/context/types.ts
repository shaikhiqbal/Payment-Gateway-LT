import { Permission } from 'src/configs/acl'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type VerfiyParams = {
  otp: string
  token: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  isSubUser: boolean
  avatar?: string | null
  permissions: Permission[]
  mobileNum?: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void

  // verifyUser: (params: VerfiyParams, errorCallback?: ErrCallbackType) => void
  verifyUser: () => void
}

export interface FakeResponse {
  access: string
  refresh: string
  profile: UserDataType
}
