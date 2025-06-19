import axios from '../../configs/axios'
import endpoints from '../../configs/endpoints'

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(endpoints.auth.login, { email, password })

  const { accessToken, refreshToken } = response.data
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)

  return response.data
}

export const registerUser = async (userData: {
  firstName: string
  lastName: string
  emailId: string
  mobileNum: string
}) => {
  return axios.post(endpoints.auth.register, userData)
}

export const logoutUser = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
