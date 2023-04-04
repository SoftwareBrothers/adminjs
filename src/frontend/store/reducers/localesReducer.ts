import type { Locale } from '../../../locale/config.js'
import { LOCALE_INITIALIZE } from '../actions/initialize-locale.js'

export type LolcaleInState = Locale

const defaultLocale = { language: 'en', translations: {} } as Locale

export const localesReducer = (
  state: Locale = defaultLocale,
  action: {
    type: string
    data: Locale
  },
) => {
  switch (action.type) {
  case LOCALE_INITIALIZE:
    return action.data
  default:
    return state
  }
}
