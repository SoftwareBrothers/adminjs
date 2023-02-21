import { ActionJSON } from './action-json.interface.js'

export const actionHasComponent = (action: ActionJSON): boolean => (
  typeof action.component !== 'undefined' && action.component === false
)
