import React, { createContext, FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { BrandingOptions } from '../../adminjs-options.interface'
import { useLocalStorage } from '../hooks/use-local-storage'
import { ReduxState } from '../store'

const BrandingContext = createContext<BrandingOptions | undefined>(undefined)

interface BrandingProviderProps {
  theme: DefaultTheme;
}

const BrandingProvider: FC<BrandingProviderProps> = ({ children, theme }) => {
  const branding = useSelector<ReduxState, BrandingOptions>(
    ({ branding: storeBranding }) => storeBranding,
  )
  const [storedTheme] = useLocalStorage<DefaultTheme>(
    'adminjs-theme',
    theme,
  )

  return (
    <BrandingContext.Provider value={branding}>
      <ThemeProvider theme={storedTheme || theme}>{children}</ThemeProvider>
    </BrandingContext.Provider>
  )
}

export const useBranding = (): BrandingOptions => {
  const ctx = useContext(BrandingContext)

  if (!ctx) {
    throw new Error('Component beyond BrandingContext!')
  }

  return ctx
}

export default BrandingProvider
