import { CurrentAdmin } from '../../../current-admin.interface'

export const SESSION_INITIALIZE = 'SESSION_INITIALIZE'

export const setCurrentAdmin = (data: CurrentAdmin | null = null) => ({
  type: SESSION_INITIALIZE,
  data,
})
