import React, { ReactNode } from 'react'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { combineStyles } from '@admin-bro/design-system'

const theme = combineStyles({})

type Props = {
  children: ReactNode;
  location?: string;
}

const TestContextProvider: React.FC<Props> = (props) => {
  const { children, location } = props
  return (
    <ThemeProvider theme={theme}>
      <StaticRouter location={location || '/'}>
        {children}
      </StaticRouter>
    </ThemeProvider>
  )
}

export default TestContextProvider
