import { CurrentAdmin } from '../../../current-admin.interface'

export const SESSION_INITIALIZE = 'SESSION_INITIALIZE'

export type SetCurrentAdminResponse = {
  type: typeof SESSION_INITIALIZE;
  data: CurrentAdmin | null;
}

export const setCurrentAdmin = (data: CurrentAdmin | null = null): SetCurrentAdminResponse => ({
  type: SESSION_INITIALIZE,
  data,
})
