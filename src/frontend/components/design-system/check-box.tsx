import React, { useState } from 'react'
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

const StyledCheckbox = styled.a<{checked: boolean | undefined}>`
  display: inline-block;
  width: 16px;
  cursor: pointer;
  border: 1px solid ${({ theme }): string => theme.colors.textDefault};
  height: 16px;
  background: ${({ checked, theme }): string => (checked ? theme.colors.primary : theme.colors.white)};
  transition: all 150ms;
  position: relative;
  z-index: 2;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px ${({ theme }): string => lighten(0.1, theme.colors.primary)};
  }
  ${HiddenCheckbox}:hover + & {
    border-color: ${({ theme }): string => theme.colors.borderHover};
  }
  ${Icon} {
    visibility: ${(props): string => (props.checked ? 'visible' : 'hidden')};
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    z-index: 1;
    width: 24px;
    height: 24px;
    opacity: 0;
    background: ${({ theme }): string => theme.colors.primary};
  }
  &:hover:before {
    opacity: 0.1;
  }
`

const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  const { className, checked, onChange, ...restProps } = props
  let handleChange = onChange
  let isChecked = checked

  // When onChange was not provided - it takes care of the state itself
  if (!handleChange) {
    let setChecked
    [isChecked, setChecked] = useState(!!checked)

    handleChange = (): void => {
      setChecked(!isChecked)
    }
  }
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={isChecked} onChange={handleChange} {...restProps as {}} />
      <StyledCheckbox
        checked={isChecked}
        onClick={(event): void => handleChange && handleChange(event as any)}
      >
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
