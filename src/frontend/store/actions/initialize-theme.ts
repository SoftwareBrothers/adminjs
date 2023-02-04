import { ThemeConfig } from '../../../adminjs-options.interface'

export const THEME_INITIALIZE = 'THEME_INITIALIZE'

export type initializeThemeResponse = {
  type: string;
  data: ThemeConfig;
}

export const initializeTheme = (data: ThemeConfig): initializeThemeResponse => ({
  type: THEME_INITIALIZE,
  data,
})
