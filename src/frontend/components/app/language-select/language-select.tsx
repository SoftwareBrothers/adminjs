import { Box, Button } from '@adminjs/design-system'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { locales } from '../../../../locale'
import { ReduxState } from '../../../store/store'

const LanguageButtons: FC = () => {
  const { locale } = useSelector((state: ReduxState) => state)
  const { availableLanguages } = locale
  const handleButton = (lng: string): void => {
    const _locale = { ...locales[lng] }
    _locale.availableLanguages = availableLanguages
    window.localStorage.setItem('locale', JSON.stringify(_locale))
    window.location.reload()
  }
  if (!availableLanguages.length) {
    return null
  }
  return (
    <>
      {availableLanguages.map(
        (lang) => (
          <Button key={lang} onClick={(): void => handleButton(lang)}>
            {lang.substring(0, 2).toUpperCase()}
          </Button>
        ),
      )}
    </>
  )
}

const LanguageSelect: FC = () => (
  <Box flex>
    <LanguageButtons />
  </Box>
)
export default LanguageSelect
