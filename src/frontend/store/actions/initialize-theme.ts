import type { ThemeInState } from '../reducers/themeReducer.js'

export const THEME_INITIALIZE = 'THEME_INITIALIZE'

export type initializeThemeResponse = {
  type: typeof THEME_INITIALIZE
  data: ThemeInState
}

export const initializeTheme = (data: ThemeInState): initializeThemeResponse => ({
  type: THEME_INITIALIZE,
  data,
})
