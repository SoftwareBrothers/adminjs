import type { LocaleTranslations } from './config.js'

import deLocale from './de/translation.json' assert { type: 'json' }
import enLocale from './en/translation.json' assert { type: 'json' }
import esLocale from './es/translation.json' assert { type: 'json' }
import itLocale from './it/translation.json' assert { type: 'json' }
import jaLocale from './ja/translation.json' assert { type: 'json' }
import plLocale from './pl/translation.json' assert { type: 'json' }
import ptBrLocale from './pt-BR/translation.json' assert { type: 'json' }
import uaLocale from './ua/translation.json' assert { type: 'json' }
import zhCNLocale from './zh-CN/translation.json' assert { type: 'json' }

export * from './config.js'
export * from './default-config.js'

export const locales: Record<string, LocaleTranslations> = {
  de: deLocale,
  en: enLocale,
  es: esLocale,
  it: itLocale,
  ja: jaLocale,
  pl: plLocale,
  'pt-BR': ptBrLocale,
  ua: uaLocale,
  'zh-CN': zhCNLocale,
}
