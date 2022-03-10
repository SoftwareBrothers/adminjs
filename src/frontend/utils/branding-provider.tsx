import React, { createContext, FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { useLocalStorage } from '../hooks/use-local-storage'
import { ReduxState } from '../store'

const useBrandingProviderProps = () => {
  return useSelector<ReduxState, [ReduxState['branding'], ReduxState['availableBrandings']]>(
    ({ branding, availableBrandings }) => [branding, availableBrandings]
  )
}

type BrandingContextValue = ReturnType<typeof useBrandingProviderProps>

const BrandingContext = createContext<BrandingContextValue | undefined>(undefined)

interface BrandingProviderProps {
  theme: DefaultTheme
}

const BrandingProvider: FC<BrandingProviderProps> = ({ children, theme }) => {
  const value = useBrandingProviderProps()
  const [storedTheme] = useLocalStorage<DefaultTheme>('adminjs-theme', theme)

  return (
    <BrandingContext.Provider value={value}>
      <ThemeProvider theme={storedTheme || theme}>{children}</ThemeProvider>
    </BrandingContext.Provider>
  )
}

export const useBranding = (): BrandingContextValue => {
  const ctx = useContext(BrandingContext)

  if (!ctx) {
    throw new Error('Component beyond BrandingContext!')
  }

  return ctx
}

export default BrandingProvider
