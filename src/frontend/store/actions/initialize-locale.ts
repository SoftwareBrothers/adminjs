import isArray from 'lodash/isArray'
import find from 'lodash/find'
import { Locale } from '../../../locale/config'

export const LOCALE_INITIALIZE = 'LOCALE_INITIALIZE'

export type InitializeLocaleResponse = {
  type: typeof LOCALE_INITIALIZE;
  data: Locale;
};

export const initializeLocale = (
  data: any, // Locale | Locale[],
): InitializeLocaleResponse =>
// if(data.availableLocales) {

// }

  // if (typeof window !== 'undefined') {
  //   const savedLocaleCode = window.localStorage.getItem('locale')
  //   console.log(savedLocaleCode)
  // }
  // if (isArray(data)) [data] = data
  ({
    type: LOCALE_INITIALIZE,
    data: data.locale,
  })
