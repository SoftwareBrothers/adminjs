import type { LocaleTranslations } from './config'

import deLocale from './de/translation.json'
import enLocale from './en/translation.json'
import esLocale from './es/translation.json'
import itLocale from './it/translation.json'
import plLocale from './pl/translation.json'
import ptBrLocale from './pt-BR/translation.json'
import uaLocale from './ua/translation.json'
import zhCNLocale from './zh-CN/translation.json'

export * from './config'
export * from './default-config'

export const locales: Record<string, LocaleTranslations> = {
  de: deLocale,
  en: enLocale,
  es: esLocale,
  it: itLocale,
  pl: plLocale,
  'pt-BR': ptBrLocale,
  ua: uaLocale,
  'zh-CN': zhCNLocale,
}
