import { ActionJSON } from './action-json.interface'

export const buildActionTestId = (action: ActionJSON): string => `action-${action.name}`
