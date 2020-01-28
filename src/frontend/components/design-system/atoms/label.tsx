import styled from 'styled-components'
import {
  color, space, fontSize,
  ColorProps, SpaceProps, FontSizeProps,
  variant, display, DisplayProps,
} from 'styled-system'

const variants = variant({
  variants: {
    required: {},
  },
})

export type LabelProps = ColorProps & SpaceProps & FontSizeProps & DisplayProps & {
  required?: boolean;
  uppercase?: boolean;
  inline?: boolean;
}

export const Label = styled.label<LabelProps>`
  display: ${({ inline }): string => (inline ? 'inline' : 'block')};
  font-family: ${({ theme }): string => theme.font};

  &:before {
    content: "${({ required }): string => (required ? '*' : '')}";
    color: ${({ theme }): string => theme.colors.bluePrimary};
    margin-right: ${({ theme }): string => theme.space.sm};
    display: ${({ required }): string => (required ? 'block-inline' : 'none')};
  }

  ${({ uppercase }): string => (uppercase ? 'text-transform: uppercase;' : '')}

  ${color};
  ${display};
  ${space};
  ${fontSize};
  ${variants}
`

Label.defaultProps = {
  color: 'greyDark',
  mb: 'default',
  fontSize: 'sm',
}
