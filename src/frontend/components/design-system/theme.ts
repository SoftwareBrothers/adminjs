export const colors = {
  // Blues
  bluePrimary: '#4268F6',
  blue80: '#6483F8',
  blueLight: '#879FFA',
  blue40: '#A9BAFA',
  bluePale: '#CBD5FD',
  blueHover: '#535B8E',
  blueSecondary: '#38CAF1',
  blueFilter: '#343F87',

  // Blacks
  black: '#1C1C38',
  darkGrey: '#454655',
  grey: '#898A9A',
  greyLight: '#C0C0CA',
  greyPale: '#F6F7FB',
  white: '#fff',

  // Additional
  red: '#FF4567',
  paleRed: '#FFA5B5',
  treal: '#70C9B0',
  paleTreal: '#DBF0F1',
  love: '#e6282b',
}

// Styled system
export const space = {
  xs: '2px',
  sm: '4px',
  default: '8px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  x4: '48px',
  x5: '64',
  x6: '80',
  x7: '128',
}

export const sizes = {
  navbarHeight: '64px',
  sidebarWidth: '300px',
  sidebarMobileWidth: '98px',
}

export interface FontSizesProps extends Array<string> {
  default: string;
  sm: string;
  xs: string;
  lg: string;
  xl: string;
  h4: string;
  h3: string;
  h2: string;
  h1: string;
}

export const fontSizes = {
  xs: '10px',
  sm: '12px',
  default: '14px',
  lg: '16px',
  xl: '18px',
  h4: '24px',
  h3: '28px',
  h2: '32px',
  h1: '40px',
}

export const fontWeights = {
  lighter: 300,
  normal: 400,
  bold: 700,
}

export const lineHeights = {
  sm: '12px',
  default: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
}

export const font = '\'Roboto\', sans-serif'
