import type { useLocation } from 'react-router'

export const DRAWER_PREROUTE_SET = 'DRAWER_PREROUTE_SET'

export type SetDrawerPreRouteResponse = {
  type: typeof DRAWER_PREROUTE_SET
  data: {
    previousRoute: Partial<ReturnType<typeof useLocation>> | null
  }
}

export const setDrawerPreRoute = (data: {
  previousRoute: Partial<ReturnType<typeof useLocation>> | null
}): SetDrawerPreRouteResponse => ({
  type: DRAWER_PREROUTE_SET,
  data,
})
