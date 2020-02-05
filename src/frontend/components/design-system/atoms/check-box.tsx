import React, { useState } from 'react'
import styled from 'styled-components'
import { opacify } from 'polished'

import { Label } from './label'

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

export const CheckboxRadioContainer = styled.span`
  display: inline-block;
  vertical-align: middle;
  & + ${Label} {
    margin-left: ${({ theme }): string => theme.space.default};
    vertical-align: middle;
    margin-bottom: ${({ theme }): string => theme.space.sm};
  }
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

type StyledProps = {
  checked?: boolean;
  disabled?: boolean;
}

const checkboxBackground = (theme, checked, disabled): string => {
  if (checked) {
    return disabled ? theme.colors.greyLight : theme.colors.bluePrimary
  }
  return theme.colors.white
}

const StyledCheckbox = styled.a<StyledProps>`
  display: inline-block;
  width: 16px;
  /* when it is placed within a container setting different font size */
  font-size: 12px;
  cursor: pointer;
  border: 1px solid ${({ theme }): string => theme.colors.greyLight};
  height: 16px;
  background: ${({ checked, theme, disabled }): string => checkboxBackground(theme, checked, disabled)};
  transition: all 150ms;
  position: relative;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 2px 4px 0 ${({ theme }): string => opacify(0.3, theme.colors.blueSecondary)};
  }
  ${HiddenCheckbox}:hover + & {
    border-color: ${({ theme }): string => theme.colors.grey};
  }
  ${Icon} {
    visibility: ${(props): string => (props.checked ? 'visible' : 'hidden')};
  }

  &:after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 24px;
    height: 24px;
    opacity: 0;
    background: ${({ theme }): string => theme.colors.bluePrimary};
  }
  &:after:before {
    opacity: 0.1;
  }
`

export type CheckBoxProps = React.HTMLProps<HTMLInputElement>

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { className, checked, onChange, disabled, ...restProps } = props
  let handleChange = onChange
  let isChecked = checked

  // When onChange was not provided - it takes care of the state itself
  if (!handleChange && !disabled) {
    let setChecked
    [isChecked, setChecked] = useState(!!checked)

    handleChange = (): void => {
      setChecked(!isChecked)
    }
  }
  return (
    <CheckboxRadioContainer className={className}>
      <HiddenCheckbox
        checked={isChecked}
        onChange={handleChange}
        {...restProps as {}}
        disabled={disabled}
      />
      <StyledCheckbox
        checked={isChecked}
        disabled={disabled}
        onClick={(event): void => handleChange && handleChange(event as any)}
      >
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxRadioContainer>
  )
}
