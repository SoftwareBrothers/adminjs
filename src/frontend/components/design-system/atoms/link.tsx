import styled from 'styled-components'
import { color, space, ColorProps, variant, SpaceProps } from 'styled-system'
import { cssClass } from '../utils/css-class'

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
      color: 'primary100',
      '&:hover': {
        color: 'hoverBg',
        '& svg': {
          fill: 'hoverBg',
        },
      },
      '& svg': {
        fill: 'primary100',
      },
    },
    danger: {
      color: 'error',
      '&:hover': {
        color: 'error',
      },
      '& svg': {
        fill: 'error',
      },
    },
    success: {
      color: 'success',
      '&:hover': {
        color: 'success',
      },
      '& svg': {
        fill: 'success',
      },
    },
    info: {
      color: 'primary60',
      '&:hover': {
        color: 'hoverBg',
      },
      '& svg': {
        fill: 'primary60',
      },
    },
    secondary: {
      color: 'accent',
      '&:hover': {
        color: 'hoverBg',
      },
      '& svg': {
        fill: 'accent',
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
 * @subcategory Atoms
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
  color: 'grey60',
  className: cssClass('Link'),
}

export default Link
