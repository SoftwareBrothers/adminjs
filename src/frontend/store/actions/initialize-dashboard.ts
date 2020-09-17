import { DashboardInState } from '../store'

export const DASHBOARD_INITIALIZE = 'DASHBOARD_INITIALIZE'

export const initializeDashboard = (data: DashboardInState): {
  type: string;
  data: DashboardInState;
} => ({
  type: DASHBOARD_INITIALIZE,
  data,
})
