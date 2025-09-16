export interface MerchantType {
  id?: string | null
  isActive?: boolean
  createdAt?: string
  updatedAt?: string | null
  firstName: string
  lastName: string
  emailId: string
  mobileNum: string
  countryCode: string
  password?: string
  uid?: string
  userRoles: {
    uid: string
    roleName?: string
  }

  active?: boolean
  serverError?: string
}

export interface MerchantViewType {
  id?: string | null
  isActive?: boolean
  createdAt?: string
  updatedAt?: string | null
  firstName: string
  lastName: string
  emailId: string
  mobileNum: string
  countryCode: string
  password?: string
  uid?: string

  active?: boolean
  serverError?: string
}
