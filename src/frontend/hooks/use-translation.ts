import {
  useTranslation as originalUseTranslation,
} from 'react-i18next'
import { TFunction, i18n } from 'i18next'

import { TranslateFunctions, createFunctions } from '../../utils/translate-functions.factory'

export type UseTranslationResponse = TranslateFunctions & {
  t: TFunction;
  i18n: i18n;
  ready: boolean;
}

export const useTranslation = (): UseTranslationResponse => {
  // eslint-disable-next-line no-shadow
  const { i18n, ...rest } = originalUseTranslation()
  const translateFunctions = createFunctions(i18n)

  return {
    ...rest,
    i18n,
    ...translateFunctions,
  }
}
