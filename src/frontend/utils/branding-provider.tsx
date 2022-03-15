import React, { createContext, FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { BrandingSelector } from '../components/app/branding-selector'
import { useLocalStorage } from '../hooks/use-local-storage'
import { ReduxState } from '../store'
import { changeBranding } from '../store/actions/initialize-branding'

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
  const dispatch = useDispatch()
  const value = useBrandingProviderProps()
  const [currentBranding] = value;
  const [storedBranding] = useLocalStorage<BrandingSelector>('adminjs-branding', { theme })

  const { theme: storedTheme, logo } = storedBranding

  useEffect(() => {
    if (logo) {
      dispatch(changeBranding({ ...currentBranding, logo }))
    }
  }, [storedBranding])

  return (
    <BrandingContext.Provider value={value}>
      <ThemeProvider theme={storedTheme}>{children}</ThemeProvider>
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
