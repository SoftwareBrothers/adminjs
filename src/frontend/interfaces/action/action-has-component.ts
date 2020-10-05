import { ActionJSON } from './action-json.interface'

export const actionHasComponent = (action: ActionJSON): boolean => (
  typeof action.component !== 'undefined' && action.component === false
)
