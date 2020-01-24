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
}

export const Label = styled.label<LabelProps>`
  display: block;
  font-family: ${({ theme }): string => theme.font};

  &:before {
    content: "${({ required }): string => (required ? '*' : '')}";
    color: ${({ theme }): string => theme.colors.bluePrimary};
    margin-right: ${({ theme }): string => theme.space[2]};
    display: ${({ required }): string => (required ? 'block-inline' : 'none')};
  }

  ${color};
  ${display};
  ${space};
  ${fontSize};
  ${variants}
`

Label.defaultProps = {
  color: 'greyDark',
  mb: 3,
  fontSize: 1,
}
