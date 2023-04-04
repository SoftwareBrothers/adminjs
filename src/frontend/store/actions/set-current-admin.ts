import type { SessionInState } from '../reducers/sessionReducer.js'

export const SESSION_INITIALIZE = 'SESSION_INITIALIZE'

export type SetCurrentAdminResponse = {
  type: typeof SESSION_INITIALIZE
  data: SessionInState
}

export const setCurrentAdmin = (data: SessionInState = null): SetCurrentAdminResponse => ({
  type: SESSION_INITIALIZE,
  data,
})
