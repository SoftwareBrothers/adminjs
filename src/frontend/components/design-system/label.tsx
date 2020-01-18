import styled, { keyframes, DefaultTheme } from 'styled-components'
import { lighten } from 'polished'
import { color, space, fontSize, ColorProps, SpaceProps, FontSizeProps, variant, display, DisplayProps } from 'styled-system'

const variants = variant({
  variants: {
    required: {},
  },
})

export type LabelProps = ColorProps & SpaceProps & FontSizeProps & DisplayProps & {
  variant?: 'required';
}

const Label = styled.label<LabelProps>`
  text-transform: uppercase;
  display: block;

  &:before {
    content: "${(props): string => (props.variant === 'required' ? '*' : '')}";
    color: ${({ theme }): string => theme.colors.primary};
    margin-right: 2px;
  }

  ${color};
  ${display};
  ${space};
  ${fontSize};
  ${variants}
`

Label.defaultProps = {
  color: 'textLight',
  mb: 3,
}

export default Label
