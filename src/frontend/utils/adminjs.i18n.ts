/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { flatten } from 'flat'
import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import intersection from 'lodash/intersection.js'
import merge from 'lodash/merge.js'
import { initReactI18next } from 'react-i18next'
import { defaultConfig, DEFAULT_NS, Locale, locales } from '../../locale/index.js'

const initTranslations = (config: Locale) => {
  const {
    language = 'en',
    availableLanguages = [],
    translations,
    localeDetection = false,
    withBackend = false,
    ...i18nConfig
  } = config

  const combinedConfig: InitOptions = merge(defaultConfig, i18nConfig, {
    supportedLngs: availableLanguages,
    fallbackLng: i18nConfig.fallbackLng || language,
  })

  const instance = i18n.createInstance(combinedConfig)

  if (!instance.isInitialized) {
    if (localeDetection) {
      instance.use(LanguageDetector as any)
    }

    if (withBackend) {
      instance.use(Backend)
    }
    instance.use(initReactI18next).init(combinedConfig)
  }

  const buildInTranslations = intersection(Object.keys(locales), availableLanguages)
  if (buildInTranslations.length) {
    buildInTranslations.forEach((lang) =>
      instance.addResourceBundle(lang, DEFAULT_NS, flatten(locales[lang])),
    )
  }

  if (translations) {
    Object.keys(translations).forEach((lang) =>
      instance.addResourceBundle(lang, DEFAULT_NS, flatten(translations[lang]), true, true),
    )
  }

  return { i18n: instance }
}
export default initTranslations
