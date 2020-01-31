import styled from 'styled-components'
import { color, space, fontSize, SpaceProps, FontSizeProps, ColorProps, variant } from 'styled-system'

export type BadgeProps = SpaceProps & FontSizeProps & ColorProps & {
  variant?: 'primary' | 'danger' | 'text' | 'success' | 'info' | 'secondary';
  outline?: boolean;
  size?: 'sm' | 'lg';
}

const variantStyle = (variantColor: string, props: BadgeProps) => ({
  bg: variantColor,
  borderColor: variantColor,
  color: props.outline ? variantColor : 'white',
})

const colorVariant = (props: BadgeProps) => variant({
  variants: {
    primary: variantStyle('bluePrimary', props),
    danger: variantStyle('red', props),
    success: variantStyle('treal', props),
    info: variantStyle('blueLight', props),
    secondary: variantStyle('blueSecondary', props),
  },
})

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      py: 'xs',
    },
    lg: {
      py: 'default',
      px: '10px',
    },
  },
})

export const Badge = styled.span<BadgeProps>`
  border-radius: 12px;
  border: 1px solid ${({ theme }): string => theme.colors.greyLight};
  color: ${({ outline, theme }): string => (outline ? theme.colors.grey : theme.colors.white)};
  vertical-align: middle;
  font-family: ${({ theme }): string => theme.font};

  ${space};
  ${color};
  ${fontSize};
  ${props => colorVariant(props)};
  ${sizeVariants};
  ${({ outline }): string => (outline ? 'background: transparent;' : '')}
`

Badge.defaultProps = {
  px: 'default',
  py: '6px',
  fontSize: 'xs',
  bg: 'greyLight',
}
