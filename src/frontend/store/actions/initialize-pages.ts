import { AdminPage } from '../../../admin-bro-options.interface'

export const PAGES_INITIALIZE = 'PAGES_INITIALIZE'

export const initializePages = (data: Array<AdminPage>): {
  type: string; data: Array<AdminPage>;
} => ({
  type: PAGES_INITIALIZE,
  data,
})
