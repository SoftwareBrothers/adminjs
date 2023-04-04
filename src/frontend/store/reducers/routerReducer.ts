import type { Location } from 'react-router'
import { ROUTE_CHANGED, INITIAL_ROUTE } from '../actions/route-changed.js'

export type RouterInState = {
  from: Partial<Location>
  to: Partial<Location>
}

export const routerReducer = (
  state: RouterInState = { from: {}, to: {} },
  action: {
    type: typeof INITIAL_ROUTE | typeof ROUTE_CHANGED
    data: any
  },
) => {
  switch (action.type) {
  case INITIAL_ROUTE:
    return {
      ...state,
      from: { ...action.data },
    }
  case ROUTE_CHANGED:
    return {
      from: { ...state.to },
      to: { ...action.data },
    }
  default:
    return state
  }
}
