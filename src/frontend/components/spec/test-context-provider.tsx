import React, { ReactNode } from 'react'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { combineStyles } from '@adminjs/design-system'

const theme = combineStyles({})

type Props = {
  children: ReactNode;
  location?: string;
}

const TestContextProvider: React.FC<Props> = (props) => {
  const { children, location } = props
  // TODO: fix children props
  const Router = StaticRouter as any
  return (
    <ThemeProvider theme={theme}>
      <Router location={location || '/'}>
        {children}
      </Router>
    </ThemeProvider>
  )
}

export default TestContextProvider
