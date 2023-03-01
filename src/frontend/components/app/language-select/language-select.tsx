import { Box, Button, DropDown, DropDownItem, DropDownMenu, DropDownTrigger, Icon } from '@adminjs/design-system'
import React, { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocalStorage } from '../../../hooks'
import { ReduxState } from '../../../store/store'

const LanguageSelect: FC = () => {
  const locale = useSelector((state: ReduxState) => state.locale)
  const [storedLocale, setStoredLocale] = useLocalStorage('locale', locale.language)
  const { availableLanguages } = locale

  const { i18n } = useTranslation()

  const handleButtonClick = useCallback((lng: string) => {
    i18n.changeLanguage(lng)
    setStoredLocale(lng)
  }, [])

  if (!availableLanguages.length || availableLanguages.length === 1) {
    return null
  }

  return (
    <Box flex alignItems="center">
      <DropDown>
        <DropDownTrigger>
          <Button color="text">
            <Icon icon="Globe" />
            {storedLocale}
          </Button>
        </DropDownTrigger>
        <DropDownMenu>
          {availableLanguages.map((lang) => (
            <DropDownItem key={lang} onClick={() => handleButtonClick(lang)}>
              {lang}
            </DropDownItem>
          ))}
        </DropDownMenu>
      </DropDown>
    </Box>
  )
}

export default LanguageSelect
