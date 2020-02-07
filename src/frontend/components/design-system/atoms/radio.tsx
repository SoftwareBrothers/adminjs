import React, { useState } from 'react'
import styled from 'styled-components'
import { opacify } from 'polished'

import { CheckboxRadioContainer } from './check-box'

const Circle = styled.span`
  display: block;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 9999px;
  background: ${({ theme }): string => theme.colors.white};
  position: absolute;
  top: 50%;
  left: 50%;
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

type StyledProps = {
  checked?: boolean;
  disabled?: boolean;
}

const radioBackground = (theme, checked, disabled): string => {
  if (checked) {
    return disabled ? theme.colors.greyLight : theme.colors.bluePrimary
  }
  return theme.colors.white
}

const StyledRadio = styled.span<StyledProps>`
  display: inline-block;
  width: 16px;
  cursor: pointer;
  border: 1px solid ${({ theme }): string => theme.colors.greyLight};
  border-radius: 1000px;
  height: 16px;
  transition: all 150ms;
  position: relative;

  ${HiddenRadio}:focus + & {
    box-shadow: 0 2px 4px 0 ${({ theme }): string => opacify(0.3, theme.colors.blueSecondary)};
  }
  ${HiddenRadio}:hover + & {
    border-color: ${({ theme }): string => theme.colors.grey};
  }
  ${Circle} {
    visibility: ${({ checked }): string => (checked ? 'visible' : 'hidden')};
  }

  background: ${({ checked, theme, disabled }): string => radioBackground(theme, checked, disabled)};
`

export type RadioProps = React.HTMLProps<HTMLInputElement>

/**
 * @typedef {object} RadioProps
 * @alias RadioProps
 * @memberof Radio
 * @property {string} [...] All props default to _radio_ html input like `onChange`,
 *                          `checked` etc.
 */

/**
 * Wrapped radio input.
 *
 * Usage:
 * ```javascript
 * import { Radio, RadioProps } from 'admin-bro'
 * ```
 *
 * @component
 * @example
 * return (
 *   <Box p="xl">
 *      <Radio id="radio1"/>
 *      <Label inline htmlFor="radio1" ml="default">Some example label</Label>
 *   </Box>
 * )
 */
export const Radio: React.FC<RadioProps> = (props) => {
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
      <HiddenRadio
        checked={isChecked}
        onChange={handleChange}
        {...restProps as {}}
        disabled={disabled}
      />
      <StyledRadio
        checked={isChecked}
        onClick={(event): void => handleChange && handleChange(event as any)}
        disabled={disabled}
      >
        <Circle />
      </StyledRadio>
    </CheckboxRadioContainer>
  )
}

export default Radio
