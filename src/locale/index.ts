import deLocale from './de.js'
import enLocale from './en.js'
import itLocale from './it.js'
import ptBrLocale from './pt-br.js'
import uaLocale from './ua.js'
import zhCNLocale from './zh-cn.js'
import plLocale from './pl.js'

export * from './config.js'

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
