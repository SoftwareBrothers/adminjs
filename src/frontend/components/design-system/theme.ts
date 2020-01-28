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

export interface SpaceProps extends Array<string> {
  default: string;
  sm: string;
  xs: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

// Styled system
export const space: SpaceProps = [
  '0', '2px', '4px', '8px', '16px', '24px', '32px', '48px', '64px', '80px', '128px',
] as SpaceProps
space.xs = '2px'
space.sm = '4px'
space.default = '8px'
space.lg = '16px'
space.xl = '24px'
space.xxl = '32px'
space.xxxl = '48px'

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

export const fontSizes: FontSizesProps = [
  '10px', '12px', '14px', '16px', '18px', '24px', '28px', '32px', '40px',
] as FontSizesProps

fontSizes.xs = '10px'
fontSizes.sm = '12px'
fontSizes.default = '14px'
fontSizes.lg = '16px'
fontSizes.xl = '18px'
fontSizes.h1 = '40px'
fontSizes.h2 = '32px'
fontSizes.h3 = '28px'
fontSizes.h4 = '24px'


export const fontWeights = {
  lighter: 300,
  normal: 400,
  bold: 700,
}

export interface LineHeightsProps extends Array<string> {
  default: string;
  sm: string;
  lg: string;
  xl: string;
  xxl: string;
}

export const lineHeights: LineHeightsProps = ['12px', '16px', '24px', '32px', '40px'] as LineHeightsProps
lineHeights.sm = '12px'
lineHeights.default = '16px'
lineHeights.lg = '24px'
lineHeights.xl = '32px'
lineHeights.xxl = '40px'

export const font = '\'Roboto\', sans-serif'
