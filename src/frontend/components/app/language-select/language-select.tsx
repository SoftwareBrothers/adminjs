import { Box, Button } from '@adminjs/design-system'
import React, { FC, useCallback } from 'react'
import { locales } from '../../../../locale'

interface LanguageSelectProps {}

const LanguageSelect: FC<LanguageSelectProps> = () => {
  const handleButton = useCallback((lang) => {
    window.localStorage.setItem('locale', JSON.stringify(locales[lang]))
    window.location.reload(true)
  }, [])

  return (
    <Box flex>
      <Button onClick={() => handleButton('pl')}>PL</Button>
      <Button onClick={() => handleButton('en')}>EN</Button>
      <Button onClick={() => handleButton('ua')}>UA</Button>
      <Button onClick={() => handleButton('pt-BR')}>BR</Button>
    </Box>
  )
}

export default LanguageSelect
