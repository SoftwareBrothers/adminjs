import type { useLocation } from 'react-router'

export const INITIAL_ROUTE = 'INITIAL_ROUTE'
export const ROUTE_CHANGED = 'ROUTE_CHANGED'

export type RouteChangedResponse = {
  type: typeof ROUTE_CHANGED
  data: any
}

export const initializeRoute = (
  location: Partial<ReturnType<typeof useLocation>>,
): RouteChangedResponse => ({
  type: ROUTE_CHANGED,
  data: location,
})

export const changeRoute = (location: ReturnType<typeof useLocation>): RouteChangedResponse => ({
  type: ROUTE_CHANGED,
  data: location,
})
