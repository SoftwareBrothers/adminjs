import { colors, sizes, fonts, space, font, fontSizes, lineHeights } from './variables'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    sizes: typeof sizes;
    fonts: typeof fonts;
    space: typeof space;
    fontSizes: typeof fontSizes;
    lineHeights: typeof lineHeights;
    font: typeof font;
  }
}
