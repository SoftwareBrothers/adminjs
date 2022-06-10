import { Locale } from '../../../locale/config'

export const LOCALE_INITIALIZE = 'LOCALE_INITIALIZE'

export type InitializeLocaleResponse = {
  type: typeof LOCALE_INITIALIZE;
  data: Locale;
};

export const initializeLocale = (
  data: any,
): InitializeLocaleResponse => ({
  type: LOCALE_INITIALIZE,
  data: data.locale,
})
