import { colors, sizes, fonts, breakpoints } from './variables'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    sizes: typeof sizes;
    fonts: typeof fonts;
    breakpoints: typeof breakpoints;
  }
}
