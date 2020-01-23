import styled from 'styled-components'
import { color, space, fontSize, SpaceProps, FontSizeProps, ColorProps, variant } from 'styled-system'

const colorVariant = props => variant({
  variants: {
    primary: {
      bg: 'primary',
      borderColor: 'primary',
      color: props.outline ? 'primary' : 'white',
    },
    danger: {
      bg: 'danger',
      borderColor: 'danger',
      color: props.outline ? 'danger' : 'white',
    },
    success: {
      bg: 'success',
      borderColor: 'success',
      color: props.outline ? 'success' : 'white',
    },
    info: {
      bg: 'info',
      borderColor: 'info',
      color: props.outline ? 'info' : 'white',
    },
    secondary: {
      bg: 'secondary',
      borderColor: 'secondary',
      color: props.outline ? 'secondary' : 'white',
    },
  },
})

const sizeVariants = variant({
  prop: 'size',
  variants: {
    sm: {
      py: 1,
    },
    lg: {
      py: 3,
      px: '10px',
    },
  },
})

type Props = SpaceProps & FontSizeProps & ColorProps & {
  variant?: 'primary' | 'danger' | 'text' | 'success' | 'info' | 'secondary';
  outline?: boolean;
}

const Badge = styled.span<Props>`
  border-radius: 12px;
  border: 2px solid ${({ theme }): string => theme.colors.disabled};
  color: ${({ outline, theme }): string => (outline ? theme.colors.disabled : theme.colors.white)};
  vertical-align: middle;

  ${space};
  ${color};
  ${fontSize};
  ${props => colorVariant(props)};
  ${sizeVariants};
  ${({ outline }): string => (outline ? 'background: transparent;' : '')}
`

Badge.defaultProps = {
  px: 3,
  py: '6px',
  fontSize: 0,
  bg: 'disabled',
}

export default Badge
