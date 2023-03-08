import type { InitOptions } from 'i18next'

const DEFAULT_LOAD = 'currentOnly'
export const DEFAULT_NS = 'translation'

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
  get initImmediate(): boolean {
    return typeof window !== 'undefined'
  },
}
