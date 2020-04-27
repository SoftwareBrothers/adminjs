import React, { useState, ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'

import { Label } from './label'
import focusShadowStyle from '../utils/focus-shadow.style'

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
    return disabled ? theme.colors.grey40 : theme.colors.primary100
  }
  return theme.colors.white
}

const StyledCheckbox = styled.a<StyledProps>`
  display: inline-block;
  width: 16px;
  /* when it is placed within a container setting different font size */
  font-size: 12px;
  cursor: pointer;
  border: 1px solid ${({ theme }): string => theme.colors.grey40};
  height: 16px;
  background: ${({ checked, theme, disabled }): string => checkboxBackground(theme, checked, disabled)};
  transition: all 150ms;
  position: relative;

  ${HiddenCheckbox}:focus + & {
    ${({ theme }): string => `box-shadow: ${focusShadowStyle(theme)};`};
  }
  ${HiddenCheckbox}:hover + & {
    border-color: ${({ theme }): string => theme.colors.grey60};
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
    background: ${({ theme }): string => theme.colors.primary100};
  }
  &:after:before {
    opacity: 0.1;
  }
`

export type CheckBoxProps = React.HTMLProps<HTMLInputElement>

/**
 * @typedef {object} CheckBoxProps
 * @alias CheckBoxProps
 * @memberof CheckBox
 * @property {string} [...] All props default to _checkbox_ html input like `onChange`,
 *                          `checked` etc.
 */

/**
 * Wrapped checkbox input.
 *
 * Usage:
 * ```javascript
 * import { CheckBox, CheckBoxProps } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Atoms
 * @example
 * return (
 *   <Box p="xl">
 *      <CheckBox id="checkbox1"/>
 *      <Label inline htmlFor="checkbox1" ml="default">Some example label</Label>
 *   </Box>
 * )
 */
export const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { className, checked, onChange, disabled, ...restProps } = props

  const [isChecked, setChecked] = useState(checked ?? false)
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(event)
    } else {
      setChecked(!event.target.checked)
    }
  }

  useEffect(() => {
    setChecked(checked ?? false)
  }, [checked])

  return (
    <CheckboxRadioContainer className={[className ?? '', 'admin-bro_Checkbox'].join(' ')}>
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

export default CheckBox
