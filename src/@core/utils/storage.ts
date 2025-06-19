export const setToken = (token: string) => localStorage.setItem('accessToken', token)
export const getToken = () => localStorage.getItem('accessToken')
export const removeToken = () => localStorage.removeItem('accessToken')
