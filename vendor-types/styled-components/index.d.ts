import styled, {
  css as originalCss,
  createGlobalStyle as originalCreateGlobalStyle,
  withTheme as originalWithTheme,
  keyframes as originalKeyframes,
  useTheme as originalUseTheme,
} from 'styled-components'
import { Theme } from '@adminjs/design-system'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}

  export const css = originalCss
  export const createGlobalStyle = originalCreateGlobalStyle
  export const withTheme = originalWithTheme
  export const keyframes = originalKeyframes
  export const useTheme = originalUseTheme

  export default styled
}
