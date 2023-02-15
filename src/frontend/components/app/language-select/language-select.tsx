import { Box, Button, DropDown, DropDownItem, DropDownMenu, DropDownTrigger, Icon } from '@adminjs/design-system'
import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Locale, locales } from '../../../../locale'
import { ReduxState } from '../../../store/store'
import { useLocalStorage } from '../../../hooks'

const LanguageSelect: FC = () => {
  const { locale } = useSelector((state: ReduxState) => state)
  const [storedLocale, setStoredLocale] = useLocalStorage('locale', locale)
  const { availableLanguages } = locale

  const handleButton = useCallback((lng: string) => {
    const selectedLocale: Locale = { ...locales[lng], availableLanguages }
    setStoredLocale(selectedLocale)
    window.location.reload()
  }, [])

  if (!availableLanguages.length) {
    return null
  }

  return (
    <Box flex alignItems="center">
      <DropDown>
        <DropDownTrigger>
          <Button>
            <Icon icon="Globe" />
            {storedLocale.language}
          </Button>
        </DropDownTrigger>
        <DropDownMenu>
          {availableLanguages.map((lang) => (
            <DropDownItem key={lang} onClick={() => handleButton(lang)}>
              {lang}
            </DropDownItem>
          ))}
        </DropDownMenu>
      </DropDown>
    </Box>
  )
}

export default LanguageSelect
