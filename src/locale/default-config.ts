import type { InitOptions } from 'i18next'
import startCase from 'lodash/startCase.js'

import type { Locale } from './config.js'

const DEFAULT_LOAD = 'currentOnly'
export const DEFAULT_NS = 'translation'

export const defaultLocale: Locale = {
  language: 'en',
  translations: {},
  availableLanguages: ['en'],
}

export const defaultConfig: InitOptions = {
  debug: process.env.NODE_ENV === 'development',
  partialBundledLanguages: true,
  interpolation: {
    escapeValue: false,
  },
  ns: [DEFAULT_NS],
  defaultNS: DEFAULT_NS,
  fallbackNS: DEFAULT_NS,
  load: DEFAULT_LOAD,
  react: {
    useSuspense: false,
  },
  resources: {},
  parseMissingKeyHandler: (key, defaultValue) => defaultValue ?? startCase(key),
  get initImmediate(): boolean {
    return typeof window !== 'undefined'
  },
}
