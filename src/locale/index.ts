import type { LocaleTranslations } from './config.js'

import deLocale from './de/translation.json' with { type: 'json' }
import enLocale from './en/translation.json' with { type: 'json' }
import esLocale from './es/translation.json' with { type: 'json' }
import itLocale from './it/translation.json' with { type: 'json' }
import jaLocale from './ja/translation.json' with { type: 'json' }
import plLocale from './pl/translation.json' with { type: 'json' }
import ptBrLocale from './pt-BR/translation.json' with { type: 'json' }
import uaLocale from './ua/translation.json' with { type: 'json' }
import zhCNLocale from './zh-CN/translation.json' with { type: 'json' }

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
