import { Box, Button } from '@adminjs/design-system'
import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLocale } from '../../../store'

interface LanguageSelectProps {}

const LanguageSelect: FC<LanguageSelectProps> = () => {
  const store = useSelector(state => state)
  const dispatch = useDispatch()

  const pl = {
    language: 'pl',
    translations: {
      messages: {
        welcomeOnBoard_title: 'Witamy na pokładzie',
      },
    },
  }

  useEffect(() => {
    console.log(store)
  }, [store])

  const handleButton = useCallback(() => {
    dispatch(initializeLocale({ locale: pl }))
  }, [])

  return (
    <Box flex>
      <Button onClick={handleButton}>PL</Button>
      <Button>EN</Button>
    </Box>
  )
}

export default LanguageSelect
