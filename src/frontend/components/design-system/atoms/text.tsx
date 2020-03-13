import styled from 'styled-components'

import {
  typography,
  TypographyProps,
  space,
  SpaceProps,
  variant,
  color,
  ColorProps,
  layout,
  LayoutProps,
} from 'styled-system'
import { cssClass } from '../utils/css-class'

const variants = variant({
  variants: {
    xs: {
      fontSize: 'xs',
    },
    sm: {
      fontSize: 'sm',
    },
    lg: {
      fontSize: 'lg',
    },
  },
})

/**
 * Prop Types of a Text component.
 * Apart from variant it extends all {@link ColorProps}, {@link SpaceProps} and
 * {@link TypographyProps}
 *
 * @memberof Text
 * @alias TextProps
 * @property {string} [...] Other props from {@link ColorProps}, {@link SpaceProps}
 *                          and {@link TypographyProps}
 */
export type TextProps = TypographyProps & SpaceProps & ColorProps & LayoutProps & {
  /** Optional variant of a <Text /> component */
  variant?: 'xs' | 'sm' | 'lg';
  /** Define this if you want to render element as something other than div */
  as?: string;
}

/**
 * Use the Text component to control font size, weight, alignment, and color.
 * By default it is rendered as a `div` but you can change this to other (like `span`)
 * by using `as` prop,
 *
 * Usage:
 * ```javascript
 * import { Text, TextProps } from 'admin-bro'
 * ```
 * @component
 * @subcategory Atoms
 * @example <caption>Lorem ipsum</caption>
 * return (
 * <Box>
 *   <Text>
 *    In publishing and graphic design,
 *    Lorem ipsum is a <b>placeholder</b> text commonly used to demonstrate the
 *    visual form of a document or a typeface without relying on meaningful
 *    content.
 *   </Text>
 *   <Text mt="default" variant="sm">This text was from Wikipedia</Text>
 * </Box>
 * )
 */
export const Text = styled.div<TextProps>`
  font-family: ${({ theme }): string => theme.font};
  margin: 0;
  padding: 0;

  & b, & strong {
    font-weight: bold;
  }

  ${typography};
  ${space};
  ${layout};
  ${color};
  ${variants};
`

Text.defaultProps = {
  lineHeight: 'lg',
  fontSize: 'default',
  fontWeight: 'normal',
  className: cssClass('Text'),
}

export default Text
