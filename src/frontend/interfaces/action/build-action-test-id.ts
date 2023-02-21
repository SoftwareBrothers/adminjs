import { ActionJSON } from './action-json.interface.js'

export const buildActionTestId = (action: ActionJSON): string => `action-${action.name}`
