import deLocale from './de'
import enLocale from './en'
import itLocale from './it'
import ptBrLocale from './pt-br'
import uaLocale from './ua'
import zhCNLocale from './zh-cn'
import plLocale from './pl'

export * from './config'

export const locales = {
  de: deLocale,
  en: enLocale,
  it: itLocale,
  'pt-BR': ptBrLocale,
  ua: uaLocale,
  'zh-CN': zhCNLocale,
  pl: plLocale,
}

export { uaLocale, enLocale, zhCNLocale, ptBrLocale, plLocale }
