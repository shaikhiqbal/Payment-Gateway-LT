// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'src/configs/axios'

// ** Config
import authConfig from 'src/configs/auth'
import endpoints from 'src/configs/endpoints'

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,

  // VerfiyParams,
  FakeResponse
} from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyUser: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        const userData = JSON.parse(window.localStorage.getItem('userData')!)
        setLoading(false)
        setUser({ ...userData })
      } else {
        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        setUser(null)
        setLoading(false)
        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
          router.replace('/login')
        }
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(endpoints.auth.login, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })
      .catch(err => {
        console.log({ err })
        if (errorCallback) errorCallback(err)
      })
  }

  /*
  const handleVerification = (params: VerfiyParams, errorCallback?: ErrCallbackType) => {
    const { token, otp } = params
    axios
      .post(`${endpoints.auth.verifyUser}${token}`, { otp })
      .then(async response => {
        const returnUrl = router.query.returnUrl
        const { access, profile, refresh } = response.data
        setUser({ ...profile })
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        window.localStorage.setItem('userData', JSON.stringify(profile))
        window.localStorage.setItem(authConfig.storageTokenKeyName, access)
        window.localStorage.setItem(authConfig.onTokenExpiration, refresh)
        router.replace(redirectURL as string)
      })
      .catch(err => {
        console.log({ err })
        if (errorCallback) errorCallback(err)
      })
  }
  */

  const handleVerification = () => {
    const returnUrl = router.query.returnUrl
    const response: FakeResponse = {
      access:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXJkaWxlb21rYXI3MjYyQGdtYWlsLmNvbSIsImlhdCI6MTc2MDU0MTgyMSwiZXhwIjoxNzYwNTQ3ODIxfQ.4KZFqOl7ZApkwcMj281T3BaMdmL9dCs7NvnHSUkz8aI',
      refresh:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXJkaWxlb21rYXI3MjYyQGdtYWlsLmNvbSIsImlhdCI6MTc2MDU0MTgyMSwiZXhwIjoxNzY1NzI1ODIxfQ.yfo9M9bqrDxxGnpX3g779d4unuVzRJbWx2jEjGHA_EY',
      profile: {
        id: 1,
        role: 'merchant',
        fullName: 'Gaurav Nerkar',
        mobileNum: '9359583345',
        username: 'gauravnerkar',
        password: 'password',
        isSubUser: false,
        permissions: [
          {
            moduleName: 'user management',
            action: 'CREATE'
          },
          {
            moduleName: 'user management',
            action: 'UPDATE'
          },
          {
            moduleName: 'user management',
            action: 'VIEW'
          },
          {
            moduleName: 'user management',
            action: 'DELETE'
          },
          {
            moduleName: 'virtual terminal',
            action: 'CREATE'
          },
          {
            moduleName: 'virtual terminal',
            action: 'UPDATE'
          },
          {
            moduleName: 'virtual terminal',
            action: 'VIEW'
          },
          {
            moduleName: 'virtual terminal',
            action: 'DELETE'
          },
          {
            moduleName: 'dashboard',
            action: 'CREATE'
          },
          {
            moduleName: 'dashboard',
            action: 'UPDATE'
          },
          {
            moduleName: 'dashboard',
            action: 'VIEW'
          },
          {
            moduleName: 'dashboard',
            action: 'DELETE'
          },
          {
            moduleName: 'permissions',
            action: 'CREATE'
          },
          {
            moduleName: 'permissions',
            action: 'UPDATE'
          },
          {
            moduleName: 'permissions',
            action: 'VIEW'
          },
          {
            moduleName: 'permissions',
            action: 'DELETE'
          },
          {
            moduleName: 'vendor',
            action: 'CREATE'
          },
          {
            moduleName: 'vendor',
            action: 'UPDATE'
          },
          {
            moduleName: 'vendor',
            action: 'VIEW'
          },
          {
            moduleName: 'vendor',
            action: 'DELETE'
          },
          {
            moduleName: 'manager',
            action: 'CREATE'
          },
          {
            moduleName: 'manager',
            action: 'update'
          }
        ],
        email: 'kardileomkar7262@gmail.com'
      }
    }
    const { access, profile, refresh } = response
    setUser({ ...profile })
    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    window.localStorage.setItem('userData', JSON.stringify(profile))
    window.localStorage.setItem(authConfig.storageTokenKeyName, access)
    window.localStorage.setItem(authConfig.onTokenExpiration, refresh)
    router.replace(redirectURL as string)
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    verifyUser: handleVerification
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
