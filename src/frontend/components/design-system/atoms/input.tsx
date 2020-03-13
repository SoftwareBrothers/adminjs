import styled, { css } from 'styled-components'
import { space, SpaceProps, layout, LayoutProps } from 'styled-system'
import focusShadowStyle from '../utils/focus-shadow.style'
import { cssClass } from '../utils/css-class'

/**
 * Input CSS Styles which can be reused in another input component with styled-components
 *
 * Usage:
 * ```
 * import { InputCSS } from 'admin-bro'
 *
 * const MyStyledInput = styled.input`
 *   ${InputCSS}
 * `
 * ```
 * @memberof Input
 * @alias InputCSS
 */
export const InputCSS = css`
  box-sizing: border-box;
  color: ${({ theme }): string => theme.colors.grey80};
  background: transparent;
  border: 1px solid ${({ theme }): string => theme.colors.inputBorder};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  line-height: ${({ theme }): string => theme.lineHeights.lg};
  font-family: ${({ theme }): string => theme.font};
  outline: none;
  &:hover {
    border-color: ${({ theme }): string => theme.colors.grey60};
  }
  &:focus {
    border-color: ${({ theme }): string => theme.colors.primary100};
    ${({ theme }): string => `box-shadow: ${focusShadowStyle(theme)}`};
  }
  &:disabled {
    color: ${({ theme }): string => theme.colors.grey40};
  }
`

/**
 * Prop Types of an Input component.
 * Apart from variant it extends all {@link LayoutProps} and {@link SpaceProps}
 *
 * @memberof Input
 * @alias InputProps
 * @property {string} [...] Other props from {@link LayoutProps}, {@link SpaceProps}
 */
export type InputProps = SpaceProps & LayoutProps

/**
 * Wrapped `input` html element.
 *
 * Usage:
 * ```javascript
 * import { Input, InputProps, InputCSS } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Atoms
 * @example
 * return (
 *   <Box p="xl">
 *      <Label htmlFor="input1">Some example label</Label>
 *      <Input id="input1" width={1/2} />
 *   </Box>
 * )
 */
export const Input = styled.input<InputProps>`
  ${InputCSS};
  ${space};
  ${layout};
`

Input.defaultProps = {
  px: 'default',
  py: 'sm',
  className: cssClass('Input'),
}

export default Input
