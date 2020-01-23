import styled, { css } from 'styled-components'
import { space, SpaceProps } from 'styled-system'

const inputStyles = css`
  color: ${({ theme }): string => theme.colors.textDefault};
  background: ${({ theme }): string => theme.colors.inputBck};
  border: 1px solid ${({ theme }): string => theme.colors.border};
  font-size: ${({ theme }): string => theme.fontSizes[2]};
  line-height: ${({ theme }): string => theme.lineHeights[2]};
  outline: none;
  &:hover{
    border-color: ${({ theme }): string => theme.colors.borderHover};
  }
  &:focus{
    border-color: ${({ theme }): string => theme.colors.primary};
  }
`

const Input = styled.input<SpaceProps>`
  ${inputStyles}
  ${space};
`

Input.defaultProps = {
  px: 3,
  py: 2,
}

export {
  Input as default,
  inputStyles,
}
