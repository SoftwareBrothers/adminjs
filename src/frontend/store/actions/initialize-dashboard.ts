import { DashboardInState } from '../reducers/dashboardReducer.js'

export const DASHBOARD_INITIALIZE = 'DASHBOARD_INITIALIZE'

export type InitializeDashboardResponse = {
  type: typeof DASHBOARD_INITIALIZE
  data: DashboardInState
}

export const initializeDashboard = (data: DashboardInState): InitializeDashboardResponse => ({
  type: DASHBOARD_INITIALIZE,
  data,
})
