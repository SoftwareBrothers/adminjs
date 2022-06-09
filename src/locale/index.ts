import enLocale from './en'
import uaLocale from './ua'
import zhCNLocale from './zh-cn'
import ptBrLocale from './pt-br'

export * from './config'

export const locales = {
  en: enLocale,
  ua: uaLocale,
  'zh-CN': zhCNLocale,
  'pt-BR': ptBrLocale,
}

export { uaLocale, enLocale, zhCNLocale, ptBrLocale }
