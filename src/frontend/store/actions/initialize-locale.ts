import { Locale } from '../../../locale/config'

export const LOCALE_INITIALIZE = 'LOCALE_INITIALIZE'

export const initializeLocale = (data: Locale): {
  type: string; data: Locale;
} => ({
  type: LOCALE_INITIALIZE,
  data,
})
