import React, { useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const Circle = styled.span`
  display: block;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 9999px;
  background: ${({ theme }): string => theme.colors.primary};
  position: absolute;
  top: 50%;
  left: 50%;
`

const RadioContainer = styled.span`
  display: inline-block;
  vertical-align: middle;
`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenRadio = styled.input.attrs({ type: 'radio' })`
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

const StyledRadio = styled.span<{checked: boolean | undefined}>`
  display: inline-block;
  width: 16px;
  cursor: pointer;
  border: 1px solid ${({ theme }): string => theme.colors.textDefault};
  border-radius: 1000px;
  height: 16px;
  transition: all 150ms;
  position: relative;

  ${HiddenRadio}:focus + & {
    box-shadow: 0 0 0 2px ${({ theme }): string => lighten(0.1, theme.colors.primary)};
  }
  ${HiddenRadio}:hover + & {
    border-color: ${({ theme }): string => theme.colors.borderHover};
  }
  ${Circle} {
    visibility: ${({ checked }): string => (checked ? 'visible' : 'hidden')};
  }
`

const Radio: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
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
    <RadioContainer className={className}>
      <HiddenRadio checked={isChecked} onChange={handleChange} {...restProps as {}} />
      <StyledRadio
        checked={isChecked}
        onClick={(event): void => handleChange && handleChange(event as any)}
      >
        <Circle />
      </StyledRadio>
    </RadioContainer>
  )
}

export default Radio
