import styled, { css } from 'styled-components'
import { space, fontSize, SpaceProps, FontSizeProps, variant } from 'styled-system'
import { lighten } from 'polished'

const inputStyles = css`
  color: ${({ theme }): string => theme.colors.textDefault};
  background: ${({ theme }): string => theme.colors.inputBck};
  border: 1px solid ${({ theme }): string => theme.colors.border};
  box-shadow: none;
  transition: box-shadow 0.3s;
  box-shadow: 0 0 0 0 #fff;
  outline: none;
  &:hover{
    border-color: ${({ theme }): string => theme.colors.borderHover};
  }
  &:focus{
    border-color: ${({ theme }): string => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }): string => lighten(0.1, theme.colors.primary)};
    transition: box-shadow 0.3s;
  }
`

const Input = styled.input<SpaceProps | FontSizeProps>`
  ${inputStyles}
  ${space};
  ${fontSize};
`

Input.defaultProps = {
  px: 3,
  py: 3,
  fontSize: 3,
}

export {
  Input as default,
  inputStyles,
}
