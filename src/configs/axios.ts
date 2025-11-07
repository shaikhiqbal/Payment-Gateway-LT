import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000
})

//**  Helper to get user location
const getLocation = (): Promise<{ lat: number; long: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject('Geolocation not supported')
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      },
      error => reject(error)
    )
  })
}

//**  Helper to get user IP
const getUserIp = async (): Promise<string> => {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()

    return data.ip
  } catch (error) {
    return ''
  }
}

//**  Request Interceptor
instance.interceptors.request.use(
  async config => {
    // debugger
    const token = localStorage.getItem('accessToken')
    config.headers = config.headers || {}

    if (token) {
      ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }

    try {
      const [userIp, location] = await Promise.all([getUserIp(), getLocation()])
      ;(config.headers as Record<string, string>)['X-IP'] = userIp
      ;(config.headers as Record<string, string>)['X-Location'] = `${location.lat},${location.long}`
    } catch (err) {
      console.warn('Failed to get IP or location:', err)
    }

    return config
  },
  error => Promise.reject(error)
)

// Response Interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      // alert('Backend server is not reachable. Please try again later.')
      console.error('Server is down.')

      // return Promise.reject(error)
    } else if (error.response) {
      // alert(`Error ${error.response.status}: ${error.response.statusText}`)
    } else {
      // alert('Something went wrong.')
    }

    return Promise.reject(error)
  }
)

export default instance
