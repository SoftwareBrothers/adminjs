import enLocale from './en'
import uaLocale from './ua'
import zhCNLocale from './zh-cn'

export * from './config'

export const locales = {
  en: enLocale,
  ua: uaLocale,
  'zh-CN': zhCNLocale,
}

export { uaLocale, enLocale, zhCNLocale }
