import type { CurrentAdmin } from '../../../current-admin.interface.js'
import { SESSION_INITIALIZE } from '../actions/set-current-admin.js'

export type SessionInState = CurrentAdmin | null

export const sessionReducer = (
  state: SessionInState = null,
  action: {
    type: string
    data: SessionInState
  },
) => {
  switch (action.type) {
  case SESSION_INITIALIZE:
    return action.data
  default:
    return state
  }
}
