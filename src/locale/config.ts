import merge from 'lodash/merge'
import { formatName } from '../utils/translate-functions.factory'

import en from './en'

export type Locale = {
  language: string;
  translations: LocaleTranslations;
}

export type LocaleTranslationsBlock = {
  actions: typeof en.translations.actions & {
    [key: string]: string;
  };
  buttons: typeof en.translations.buttons;
  labels: typeof en.translations.labels & {
    [key: string]: string;
  };
  messages: typeof en.translations.messages;
  properties: {
    [key: string]: string;
  };
}

export type LocaleTranslations = LocaleTranslationsBlock & {
  resources?: {
    [key: string]: LocaleTranslationsBlock;
  };
}

// Escaping all keys with . (changing to '&#46;')
const renameKeys = object => Object.entries(object).reduce((memo, [k, v]) => {
  if (typeof v === 'object') {
    return {
      ...memo,
      [formatName(k)]: renameKeys(v),
    }
  }
  return {
    ...memo,
    [formatName(k)]: v,
  }
}, {})

export const combineTranslations = (
  originalTranslations: LocaleTranslations,
  adminTranslations: Partial<LocaleTranslations> = {},
): LocaleTranslations => {
  const formatedTranslations = renameKeys(adminTranslations)
  return merge(originalTranslations, formatedTranslations)
}
