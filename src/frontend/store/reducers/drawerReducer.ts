import { DRAWER_PREROUTE_SET, SetDrawerPreRouteResponse } from '../actions/set-drawer-preroute.js'

export type DrawerInState = SetDrawerPreRouteResponse['data']

export const drawerReducer = (
  state: DrawerInState = { previousRoute: null },
  action: {
    type: string
    data: DrawerInState
  },
) => {
  switch (action.type) {
  case DRAWER_PREROUTE_SET: {
    return {
      ...state,
      ...action.data,
    }
  }
  default: {
    return state
  }
  }
}
