import React, { createContext, FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store';
import { BrandingOptions } from '../../adminjs-options.interface';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import merge from 'lodash/merge';

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
  theme: DefaultTheme
}

const BrandingProvider: FC<BrandingProviderProps> = ({ children, theme }) => {
  const value = useBrandingProps();
  console.log(value);

  const combinedTheme = merge((window as any).THEME, theme, value.theme || {})

  return (
    <BrandingContext.Provider value={value}>
      <ThemeProvider theme={combinedTheme}>{children}</ThemeProvider>
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
