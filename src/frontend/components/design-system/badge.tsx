import styled from 'styled-components'
import { color, space, fontSize, SpaceProps, FontSizeProps, ColorProps, variant } from 'styled-system'

const variantStyle = (color: string, props) => ({
  bg: color,
  borderColor: color,
  color: props.outline ? color : 'white',
})

const colorVariant = props => variant({
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
  border: 2px solid ${({ theme }): string => theme.colors.darkGray};
  color: ${({ outline, theme }): string => (outline ? theme.colors.darkGray : theme.colors.white)};
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
