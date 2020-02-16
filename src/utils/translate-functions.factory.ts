import { i18n as I18n, TFunction, TOptions } from 'i18next'
import startCase from 'lodash/startCase'
import { LocaleTranslationsBlock } from '../locale/config'

export type TranslateFunction<T> = (
  key: T,
  resourceId?: string | TOptions,
  options?: TOptions
) => string

type ActionNameType = keyof LocaleTranslationsBlock['actions']
type ButtonLabelType = keyof LocaleTranslationsBlock['buttons']
type LabelType = keyof LocaleTranslationsBlock['labels']
type MessageType = keyof LocaleTranslationsBlock['messages']

export interface TranslateFunctions {
  t: TFunction;
  translate: TFunction;
  ta: TranslateFunction<ActionNameType>;
  translateAction: TranslateFunction<ActionNameType>;
  tb: TranslateFunction<ButtonLabelType>;
  translateButton: TranslateFunction<ButtonLabelType>;
  tl: TranslateFunction<LabelType>;
  translateLabel: TranslateFunction<LabelType>;
  tp: TranslateFunction<string>;
  translateProperty: TranslateFunction<string>;
  tm: TranslateFunction<MessageType>;
  translateMessage: TranslateFunction<MessageType>;
}

export const formatName = (name: string): string => name.replace('.', '&#46;')

const translate = (
  i18n: I18n,
  key: string,
  name: string,
  resourceId?: string | TOptions,
  options?: TOptions,
): string => {
  const realOptions: TOptions = (typeof resourceId === 'string' ? options : resourceId) || {}
  const formatedName = formatName(name)
  let keys = [`${key}.${formatedName}`]
  if (resourceId) {
    keys = [`resources.${resourceId}.${key}.${formatedName}`, ...keys]
  }
  return i18n.exists(keys) ? i18n.t(keys, realOptions) : startCase(name)
}

export const createFunctions = (i18n: I18n): TranslateFunctions => {
  const translateAction: TranslateFunction<ActionNameType> = (actionName, resourceId, options) => (
    translate(i18n, 'actions', actionName as string, resourceId, options)
  )

  const translateButton: TranslateFunction<ButtonLabelType> = (
    buttonLabel, resourceId, options,
  ) => (
    translate(i18n, 'buttons', buttonLabel, resourceId, options)
  )

  const translateLabel: TranslateFunction<LabelType> = (label, resourceId, options) => (
    translate(i18n, 'labels', label as string, resourceId, options)
  )

  const translateProperty: TranslateFunction<string> = (propertyName, resourceId, options) => (
    translate(i18n, 'properties', propertyName, resourceId, options)
  )

  const translateMessage: TranslateFunction<MessageType> = (messageName, resourceId, options) => (
    translate(i18n, 'messages', messageName, resourceId, options)
  )

  return {
    translateAction,
    ta: translateAction,
    translateButton,
    tb: translateButton,
    translateLabel,
    tl: translateLabel,
    translateProperty,
    tp: translateProperty,
    translateMessage,
    tm: translateMessage,
    t: i18n.t,
    translate: i18n.t,
  }
}
