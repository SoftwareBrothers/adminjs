export const OPEN_FILTER_DRAWER = 'OPEN_FILTER_DRAWER'
export const CLOSE_FILTER_DRAWER = 'CLOSE_FILTER_DRAWER'

export type FilterDrawerAction =
  | { type: typeof OPEN_FILTER_DRAWER; isVisible: true }
  | { type: typeof CLOSE_FILTER_DRAWER; isVisible: false }

export const showFilterDrawer = (): FilterDrawerAction => ({
  type: OPEN_FILTER_DRAWER,
  isVisible: true,
})

export const hideFilterDrawer = (): FilterDrawerAction => ({
  type: CLOSE_FILTER_DRAWER,
  isVisible: false,
})
