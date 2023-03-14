import React, { ReactNode } from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { ThemeProvider } from 'styled-components'
import { combineStyles } from '@adminjs/design-system'
import { I18nextProvider } from 'react-i18next'
import { defaultLocale } from '../../../locale'
import initTranslations from '../../utils/adminjs.i18n'

const theme = combineStyles({})

type Props = {
  children: ReactNode;
  location?: string;
}

const TestContextProvider: React.FC<Props> = (props) => {
  const { children, location } = props
  const { i18n } = initTranslations(defaultLocale)

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={location || '/'}>
          {children}
        </StaticRouter>
      </I18nextProvider>
    </ThemeProvider>
  )
}

export default TestContextProvider
