import styled, { css } from 'styled-components'
import { space, SpaceProps, layout, LayoutProps, variant } from 'styled-system'

const variants = variant({
  variants: {
    filter: {
      color: 'white',
    },
  },
})

export const InputStyles = css`
  box-sizing: border-box;
  color: ${({ theme }): string => theme.colors.darkGrey};
  background: transparent;
  border: 1px solid ${({ theme }): string => theme.colors.greyLight};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  line-height: ${({ theme }): string => theme.lineHeights.lg};
  font-family: ${({ theme }): string => theme.font};
  outline: none;
  &:hover {
    border-color: ${({ theme }): string => theme.colors.grey};
  }
  &:focus {
    border-color: ${({ theme }): string => theme.colors.bluePrimary};
  }
  &:disabled {
    color: ${({ theme }): string => theme.colors.greyLight};
  }
  ${variants}
`

export type InputProps = SpaceProps & LayoutProps & {
  variant?: 'filter';
}

export const Input = styled.input<InputProps>`
  ${InputStyles}
  ${space};
  ${layout};
`

Input.defaultProps = {
  px: 'default',
  py: 'sm',
}
