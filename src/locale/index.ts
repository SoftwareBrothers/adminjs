import plLocale from './pl'
import enLocale from './en'
import uaLocale from './ua'
import zhCNLocale from './zh-cn'
import ptBrLocale from './pt-br'

export * from './config'

export const locales = {
  pl: plLocale,
  en: enLocale,
  ua: uaLocale,
  'zh-CN': zhCNLocale,
  'pt-BR': ptBrLocale,
}

export { plLocale, uaLocale, enLocale, zhCNLocale, ptBrLocale }
