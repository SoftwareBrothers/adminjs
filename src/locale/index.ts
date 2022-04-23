import enLocale from './en'
import uaLocale from './ua'
import zhCNLocale from './zh-CN'

export * from './config'

export const locales = {
  en: enLocale,
  ua: uaLocale,
  'zh-cn': zhCNLocale
}

export { uaLocale, enLocale, zhCNLocale }
