import styled from 'styled-components'

const StyledInput = styled.input.attrs(props => ({
  className: props.className || 'input',
}))`
  background: ${({ theme }): string => theme.colors.inputBck};
  color: ${({ theme }): string => theme.colors.defaultText};
  &:hover{
    border-color: ${({ theme }): string => theme.colors.borderHover};
  }
`

export default StyledInput
