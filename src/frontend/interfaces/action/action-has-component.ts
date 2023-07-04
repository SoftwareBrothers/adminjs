import { ActionJSON } from './action-json.interface.js'

export const actionHasDisabledComponent = (action: ActionJSON): boolean => (
  typeof action.component !== 'undefined' && action.component === false
)

export const actionHasCustomComponent = (action: ActionJSON): boolean => (
  typeof action.component === 'string'
)
