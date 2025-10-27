const endpoints = {
  auth: {
    login: 'auth/login',

    // verifyUser: '/auth/user/profile/',
    verifyUser: '/auth/verify_account/',
    register: '/auth/user/create',
    refresh: '/auth/refresh_token',
    resetPassword: '/auth/user/reset_password',
    generateNewPassword: '/auth/user/create_password/',
    generateOTP: '/auth/user/send_otp/'
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
  },
  userManagement: {
    endpoint: '/sub_user/',
    getAll: '/sub_user'
  }
}

export default endpoints
