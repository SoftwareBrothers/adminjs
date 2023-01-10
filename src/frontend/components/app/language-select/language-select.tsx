import { Box, Button } from '@adminjs/design-system'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { locales } from '../../../../locale'
import { ReduxState } from '../../../store/store'
import { useLocalStorage } from '../../../hooks'

const LanguageButtons: FC = () => {
  const { locale } = useSelector((state: ReduxState) => state)
  const [loc, setLocale] = useLocalStorage('locale', locale)
  const { availableLanguages } = locale
  const handleButton = (lng: string) => {
    const selectedLocale = { ...locales[lng] }
    selectedLocale.availableLanguages = availableLanguages
    setLocale(selectedLocale)
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
