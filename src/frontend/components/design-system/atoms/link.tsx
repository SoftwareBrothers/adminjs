import styled from 'styled-components'
import { color, space, ColorProps, variant, SpaceProps } from 'styled-system'

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      fontSize: 'xs',
      py: 'sm',
    },
    lg: {
      fontSize: 'default',
    },
  },
})

const variants = variant({
  variants: {
    primary: {
      color: 'bluePrimary',
      '&:hover': {
        color: 'blueHover',
        '& svg': {
          fill: 'blueHover',
        },
      },
      '& svg': {
        fill: 'bluePrimary',
      },
    },
    danger: {
      color: 'red',
      '&:hover': {
        color: 'red',
      },
      '& svg': {
        fill: 'red',
      },
    },
    success: {
      color: 'treal',
      '&:hover': {
        color: 'treal',
      },
      '& svg': {
        fill: 'treal',
      },
    },
    info: {
      color: 'blueLight',
      '&:hover': {
        color: 'blueHover',
      },
      '& svg': {
        fill: 'blueLight',
      },
    },
    secondary: {
      color: 'blueSecondary',
      '&:hover': {
        color: 'blueHover',
      },
      '& svg': {
        fill: 'blueSecondary',
      },
    },
  },
})

/**
 * Prop Types of a Link component.
 * Apart from those explicitly specified below it extends all {@link ColorProps},
 * and {@link SpaceProps}
 *
 * @memberof Link
 * @alias LinkProps
 * @property {string} [...] All props default to _a_ html component like `href`,
 *                          `onClick` etc.
 * @property {string} [...] Other props from {@link ColorProps} and {@link SpaceProps}
 */
export type LinkProps = ColorProps & SpaceProps & {
  /** Defines if link should be uppercase */
  uppercase?: boolean;
  /** Color variant */
  variant?: 'primary' | 'danger' | 'success' | 'info' | 'secondary';
  /** Size variant */
  size?: 'sm' | 'lg';
}

/**
 * Styled form of Link element.
 *
 * Usage:
 * ```javascript
 * import { Link, LinkProps } from 'admin-bro'
 * ```
 * @component
 * @example <caption>All color variants</caption>
 * const variants = ['primary', 'danger', 'success', 'info', 'secondary']
 * return (
 * <Box py="xl">
 *   {variants.map(variant => (
 *      <Link href="#" variant={variant} mr="xl">{variant}</Link>
 *   ))}
 * </Box>
 * )
 * @example <caption>With icons</caption>
 * return (
 * <Box py="xl">
 *   <Link href="#" mr="xl">
 *     <Icon icon="Add" />
 *     With an icon
 *   </Link>
 * </Box>
 * )
 */
export const Link = styled.a<LinkProps>`
  font-family: ${({ theme }): string => theme.font};
  vertical-align: middle;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  & svg {
    padding-right: ${({ theme }): string => theme.space.default};
    vertical-align: text-top;
  }
  ${({ uppercase }): string => (uppercase ? 'text-transform: uppercase;' : '')}
  ${color};
  ${space};
  ${sizeVariants};
  ${variants};
`

Link.defaultProps = {
  color: 'grey',
}

export default Link
