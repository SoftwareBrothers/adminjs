import styled, { css } from 'styled-components'
import { color, space, ColorProps, SpaceProps,
  TypographyProps, typography, variant } from 'styled-system'
import focusShadowStyle from '../utils/focus-shadow.style'
import { cssClass } from '../utils/css-class'

const variantShared = {
  color: 'white',
  'border-color': 'transparent',
  [`& .${cssClass('Icon')} svg`]: {
    fill: 'white',
  },
  '&:disabled': {
    bg: 'grey40',
  },
}

const buttonVariants = variant({
  variants: {
    primary: {
      bg: 'primary100',
      '&:hover': {
        bg: 'hoverBg',
      },
      className: cssClass(['Button', 'Button_Primary']),
      ...variantShared,
    },
    danger: {
      bg: 'error',
      '&:hover': {
        bg: 'errorDark',
      },
      className: cssClass(['Button', 'Button_Danger']),
      ...variantShared,
    },
    success: {
      bg: 'success',
      '&:hover': {
        bg: 'successDark',
      },
      className: cssClass(['Button', 'Button_Success']),
      ...variantShared,
    },
    info: {
      bg: 'info',
      '&:hover': {
        bg: 'infoDark',
      },
      className: cssClass(['Button', 'Button_Info']),
      ...variantShared,
    },
    secondary: {
      bg: 'accent',
      className: cssClass(['Button', 'Button_Secondary']),
      ...variantShared,
    },
    text: {
      bg: 'transparent',
      borderColor: 'transparent',
      '&:disabled': {
        'border-color': 'transparent',
      },
      '&:hover': {
        background: 'transparent',
        color: 'hoverBg',
        'border-color': 'transparent',
        'text-decoration': 'underline',
      },
      '&:focus': {
        background: 'transparent',
        'border-color': 'transparent',
      },
      '& svg': {
        fill: 'primary100',
      },
      '&:hover svg': {
        fill: 'hoverBg',
      },
      className: cssClass(['Button', 'Button_Text']),
    },
  },
})

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      fontSize: 'default',
      py: 'sm',
      px: 'xxl',
      [`& .${cssClass('Icon')}`]: {
        paddingRight: 'sm',
      },
    },
    lg: {
      py: 'default',
      lineHeight: 'lg',
    },
    icon: {
      py: 'default',
      px: 'default',
      lineHeight: 'sm',
      minWidth: '34px',
      height: '34px',
      [`& .${cssClass('Icon')}`]: {
        padding: 0,
      },
    },
  },
})

/**
 * Prop Types of an Button component.
 * Apart from those defined below it extends all {@link ColorProps}, {@link SpaceProps}
 * and {@link TypographyProps}
 *
 * @memberof Button
 * @alias ButtonProps
 * @property {string} [...] Other props from {@link ColorProps}, {@link SpaceProps}
 *                          and {@link TypographyProps}
 */
export type ButtonProps = ColorProps & SpaceProps & TypographyProps & {
  /**
   * Button color variant
   */
  variant?: 'primary' | 'danger' | 'text' | 'success' | 'info' | 'secondary';
  /**
   * Button size variant
   */
  size?: 'sm' | 'lg' | 'icon';
  /**
   * If button should be rounded
   */
  rounded?: boolean;
}

/**
 * Button CSS Styles which can be reused in another button-like component with styled-components
 *
 * Usage:
 * ```
 * import { ButtonCSS } from 'admin-bro'
 * import { Link } from 'react-router-dom'
 *
 * const MyStyledLink = styled(Link)`
 *   ${ButtonCSS}
 * `
 * ```
 * @memberof Button
 * @alias ButtonCSS
 */
export const ButtonCSS = css<ButtonProps>`
  outline: 0;
  display: inline-block;
  font-family: ${({ theme }): string => theme.font};
  line-height: ${({ theme }): string => theme.lineHeights.lg};
  border: 1px solid ${({ theme }): string => theme.colors.primary100};
  color: ${({ theme }): string => theme.colors.primary100};
  cursor: pointer;
  text-decoration: none;
  padding: ${({ theme }): string => theme.space.default} ${({ theme }): string => theme.space.x3};
  box-sizing: border-box;

  & > .${cssClass('Icon')} {
    padding-bottom: 2px;
    vertical-align: middle;
    padding-right: ${({ theme }): string => theme.space.default};
  }

  & .${cssClass('Icon')} svg {
    width: 16px;
    height: 16px;
    fill: ${({ theme }): string => theme.colors.primary100};
  }
  &:hover {
    color: ${({ theme }): string => theme.colors.white};
    background: ${({ theme }): string => theme.colors.hoverBg};
    border-color: ${({ theme }): string => theme.colors.hoverBg};
    & .${cssClass('Icon')} svg {
      fill: ${({ theme }): string => theme.colors.white};
    }
  }
  &:focus {
    border-color: ${({ theme }): string => theme.colors.accent};
    ${({ theme }): string => `box-shadow: ${focusShadowStyle(theme)}`};
  }

  &:disabled {
    color: ${({ theme }): string => theme.colors.grey60};
    border-color: ${({ theme }): string => theme.colors.grey80};
    background: ${({ theme }): string => theme.colors.white};
    cursor: default;
    & .${cssClass('Icon')} svg {
      fill: ${({ theme }): string => theme.colors.grey60};
    }
  }

  ${({ rounded }): string => (rounded ? 'border-radius: 9999px' : '')};

  ${color};
  ${space};
  ${typography};
  ${buttonVariants};
  ${sizeVariants};
`

/**
 * Buttons make common actions immediately visible and easy to perform with one click or tap.
 * They can be used for any type of action.
 *
 * * Usage
 * ```javascript
 * import { Button, ButtonCSS, ButtonProps } from 'admin-bro'
 * ```
 * @component
 * @subcategory Atoms
 * @example <caption>Color variants</caption>
 * const variants = ['primary', 'danger', 'success', 'info', 'secondary', 'text']
 * return (
 * <Box py="lg">
 *   <Button mb="default" mr="default">default</Button>
 *   {variants.map(variant => (
 *     <Button mb="default" variant={variant} mr="default">{variant}</Button>
 *   ))}
 * </Box>
 * )
 * @example <caption>Size variants</caption>
 * return (
 * <Box py="lg">
 *   <Button size="sm">Small</Button>
 *   <Button ml="default">Regular size</Button>
 *   <Button size="lg" ml="default">Large</Button>
 * </Box>
 * )
 * @example <caption>Icons</caption>
 * return (
 * <Box py="lg">
 *  <Button mr="default">
 *    <Icon icon="Settings" />
 *    With icon
 *  </Button>
 *  <Button size="icon" mr="default"><Icon icon="Settings" /></Button>
 *  <Button rounded size="icon" mr="default"><Icon icon="Settings" /></Button>
 *  <Button variant="danger" mr="default">
 *    <Icon icon="Delete" />
 *    Delete me
 *  </Button>
 *  <Button mr="default" variant="text" size="sm">
 *    <Icon icon="Add" />
 *    Create new item
 *  </Button>
 * </Box>
 * )
 * @example <caption>State</caption>
 * return (
 * <Box py="lg">
 *   <Button disabled>Disabled</Button>
 *   <Button ml="default" variant="primary" disabled>Disabled</Button>
 * </Box>
 * )
 *
 */
export const Button = styled.button<ButtonProps>`
  ${ButtonCSS}
`

Button.defaultProps = {
  fontSize: 'default',
  bg: 'transparent',
  className: cssClass('Button'),
}

export default Button
