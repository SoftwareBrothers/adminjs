import styled from 'styled-components'
import { space, typography, layout, SpaceProps, TypographyProps, LayoutProps } from 'styled-system'
import { InputCSS } from './input'
import { cssClass } from '../utils/css-class'


/**
 * Prop Types of a TextArea component.
 * It extends all {@link SpaceProps}, {@link TypographyProps} and {@link LayoutProps}
 * @memberof TextArea
 * @alias TextAreaProps
 * @property {string} [...] All props default to _textarea_ html component like `onChange`,
 *                          `value` etc.
 * @property {string} [...] Props from {@link SpaceProps}, {@link TypographyProps}
 *                          and {@link LayoutProps}
 */
export type TextAreaProps = SpaceProps & TypographyProps & LayoutProps

/**
 * Wrapped `textarea` html element.
 *
 * Usage:
 * ```javascript
 * import { TextArea, TextAreaProps } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Atoms
 * @example
 * return (
 *   <Box p="xl">
 *      <Label htmlFor="textarea1">Some example label</Label>
 *      <TextArea id="textarea1" width={1/2} />
 *   </Box>
 * )
 */
export const TextArea = styled.textarea<TextAreaProps>`
  ${InputCSS}
  ${space};
  ${layout};
  ${typography};
`

TextArea.defaultProps = {
  px: 'default',
  py: 'default',
  fontSize: 'lg',
  className: cssClass('TextArea'),
}

export default TextArea
