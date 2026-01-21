// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const fakeUser = {
  accessToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXJkaWxlb21rYXI3MjYyQGdtYWlsLmNvbSIsImlhdCI6MTc2MDU0MTgyMSwiZXhwIjoxNzYwNTQ3ODIxfQ.4KZFqOl7ZApkwcMj281T3BaMdmL9dCs7NvnHSUkz8aI',
  refreshToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXJkaWxlb21rYXI3MjYyQGdtYWlsLmNvbSIsImlhdCI6MTc2MDU0MTgyMSwiZXhwIjoxNzY1NzI1ODIxfQ.yfo9M9bqrDxxGnpX3g779d4unuVzRJbWx2jEjGHA_EY',
  user: {
    firstName: 'Gaurav',
    lastName: 'Nerkar',
    mobileNum: '9359583345',
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
    emailId: 'kardileomkar7262@gmail.com'
  }
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.user === null && !window.localStorage.getItem('userData')) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }
    }
  }, [router.route, router.isReady, router.asPath, auth.user, router])

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
