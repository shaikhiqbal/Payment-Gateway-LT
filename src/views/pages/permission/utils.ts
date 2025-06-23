import { PermissionListType, ActionType, PermissionFormValueType } from 'src/types/pages/permission'

const pageIndexes = {
  dashboard: 0,
  'virtual terminal': 1,
  permission: 2,
  'user management': 3
}

export const convertToTitleCase = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const convertListToFormat = (obj: PermissionListType): Array<PermissionFormValueType<ActionType>> => {
  const updatedObject = Object.keys(obj).map(key => {
    const typedKey = key as keyof typeof pageIndexes
    return {
      title: convertToTitleCase(key),
      index: pageIndexes[typedKey] ?? 0,
      actions: obj[key as keyof PermissionListType].map(({ action, moduleName, uid }: ActionType) => {
        return {
          action,
          moduleName,
          uid,
          isSelected: false
        }
      })
    }
  })

  return updatedObject.sort((a, b) => a.index - b.index)
}
