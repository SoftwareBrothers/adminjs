import React, { createContext, FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { BrandingOptions } from '../../adminjs-options.interface';
import { useLocalStorage } from '../hooks/use-local-storage';
import { ReduxState } from '../store';

const useBrandingProps = () => {
  const branding = useSelector<ReduxState, BrandingOptions>(
    ({ branding }) => branding
  );

  return branding;
};

type BrandingContextValue = ReturnType<typeof useBrandingProps>;

const BrandingContext = createContext<BrandingContextValue | undefined>(
  undefined
);

interface BrandingProviderProps {
  theme: DefaultTheme;
}

const BrandingProvider: FC<BrandingProviderProps> = ({ children }) => {
  const branding = useBrandingProps();
  const [storedTheme] = useLocalStorage<DefaultTheme>(
    'adminjs-theme',
    (window as any).THEME
  );

  return (
    <BrandingContext.Provider value={branding}>
      <ThemeProvider theme={storedTheme}>{children}</ThemeProvider>
    </BrandingContext.Provider>
  );
};

export const useBranding = (): BrandingContextValue => {
  const ctx = useContext(BrandingContext);

  if (!ctx) {
    throw new Error('Component beyond BrandingContext!');
  }

  return ctx;
};

export default BrandingProvider;
