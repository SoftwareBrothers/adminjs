import type { useLocation } from 'react-router'

export const ROUTE_CHANGED = 'ROUTE_CHANGED'

export type RouteChangedResponse = {
  type: typeof ROUTE_CHANGED;
  data: any;
};

export const changeRoute = (
  location: ReturnType<typeof useLocation>,
): RouteChangedResponse => ({
  type: ROUTE_CHANGED,
  data: location,
})
