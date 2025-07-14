export interface ActionType {
  action: string
  moduleName: string
  uid: string
  isSelected?: boolean
}

export interface PermissionListType {
  dashboard: ActionType[]
  'user management': ActionType[]
  'virtual terminal': ActionType[]
  permissions: ActionType[]
}

export interface PermissionFormValueType<ActionType> {
  title: string
  index?: number
  actions: ActionType[]
}

export interface PermissionTableRowType {
  createdAt: string
  roleName: string
  uid: string
}

export type UserType = {
  uid: string
  firstName: string
  lastName: string
  mobileNum: string
  email: string
  id?: number
  roleName?: string
}
