const endpoints = {
  auth: {
    login: 'auth/login',
    // verifyUser: '/auth/user/profile/',
    verifyUser: '/auth/verify_account/',
    register: '/auth/user/create',
    refresh: '/auth/refresh_token',
    resetPassword: '/auth/user/reset_password'
  },
  virtualTerminal: {
    create: '/api/transaction',
    get: '/virtual_terminal/get',
    update: '/virtual_terminal/update',
    delete: '/virtual_terminal/delete',
    list: '/virtual_terminal/list'
  },
  permission: {
    getAll: '/permission/get'
  },
  rolePermission: {
    endpoint: '/userpermission'
  }
}

export default endpoints
