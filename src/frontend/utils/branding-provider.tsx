import React, { createContext, FC, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { BrandingSelector } from '../components/app/branding-selector'
import { useLocalStorage } from '../hooks/use-local-storage'
import { ReduxState } from '../store'
import { changeBranding } from '../store/actions/initialize-branding';

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
  const dispatch = useDispatch();
  const currentBranding = useSelector((state: ReduxState) => state.branding);
  const [storedBranding] = useLocalStorage<BrandingSelector>('adminjs-branding', { theme })

  const { theme: storedTheme, logo } = storedBranding;

  React.useEffect(() => {
    if (logo) {
      dispatch(changeBranding({ ...currentBranding, logo }))
    }
  }, [storedBranding]);

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
