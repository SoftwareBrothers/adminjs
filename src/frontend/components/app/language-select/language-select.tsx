import { Box, Button } from '@adminjs/design-system'
import React, { FC, useCallback } from 'react'
import { locales } from '../../../../locale'

const LanguageSelect: FC = () => {
  const handleButton = useCallback((lang) => {
    window.localStorage.setItem('locale', JSON.stringify(locales[lang]))
    window.location.reload(true)
  }, [])

  return (
    <Box flex>
      <Button onClick={(): void => handleButton('pl')}>PL</Button>
      <Button onClick={(): void => handleButton('en')}>EN</Button>
      <Button onClick={(): void => handleButton('ua')}>UA</Button>
      <Button onClick={(): void => handleButton('pt-BR')}>BR</Button>
    </Box>
  )
}

export default LanguageSelect
