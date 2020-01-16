import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const CheckboxContainer = styled.span`
  display: inline-block;
  vertical-align: middle;
`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.span<{checked: boolean | undefined}>`
  display: inline-block;
  width: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 16px;
  background: ${({ checked, theme }): string => (checked ? theme.colors.primary : theme.colors.white)};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px ${({ theme }): string => lighten(0.1, theme.colors.primary)};
  }
  ${HiddenCheckbox}:hover + & {
    border-color: ${({ theme }): string => theme.colors.borderHover};
  }
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  const { className, checked, onChange, ...restProps } = props
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} onChange={onChange} {...restProps} />
      <StyledCheckbox checked={checked} onClick={onChange}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
