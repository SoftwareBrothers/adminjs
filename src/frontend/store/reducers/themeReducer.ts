import type { ThemeConfig } from '../../../adminjs-options.interface.js'
import { THEME_INITIALIZE } from '../actions/initialize-theme.js'

export type ThemeInState = (ThemeConfig & { availableThemes?: ThemeConfig[] }) | null

export const themeReducer = (
  state: ThemeInState = null,
  action: {
    type: string
    data: ThemeInState
  },
) => {
  switch (action.type) {
  case THEME_INITIALIZE:
    return action.data
  default:
    return state
  }
}
