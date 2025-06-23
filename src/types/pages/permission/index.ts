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
