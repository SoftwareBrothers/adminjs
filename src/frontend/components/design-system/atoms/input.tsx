import styled, { css } from 'styled-components'
import { space, SpaceProps, layout, LayoutProps } from 'styled-system'

export const InputStyles = css`
  box-sizing: border-box;
  color: ${({ theme }): string => theme.colors.darkGrey};
  background: ${({ theme }): string => theme.colors.white};
  border: 1px solid ${({ theme }): string => theme.colors.greyLight};
  font-size: ${({ theme }): string => theme.fontSizes[2]};
  line-height: ${({ theme }): string => theme.lineHeights[2]};
  font-family: ${({ theme }): string => theme.font};
  outline: none;
  &:hover{
    border-color: ${({ theme }): string => theme.colors.grey};
  }
  &:focus{
    border-color: ${({ theme }): string => theme.colors.bluePrimary};
  }
`

export type InputProps = SpaceProps | LayoutProps

export const Input = styled.input<InputProps>`
  ${InputStyles}
  ${space};
  ${layout};
`

Input.defaultProps = {
  px: 3,
  py: 2,
}
