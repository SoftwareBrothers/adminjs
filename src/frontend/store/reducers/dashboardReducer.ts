import { DASHBOARD_INITIALIZE } from '../actions/initialize-dashboard.js'

export type DashboardInState = {
  component?: string
}

export const dashboardReducer = (
  state = {},
  action: {
    type: string
    data: DashboardInState
  },
): DashboardInState => {
  switch (action.type) {
  case DASHBOARD_INITIALIZE:
    return action.data
  default:
    return state
  }
}
