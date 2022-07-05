import { CurrencyInput, CurrencyInputProps } from '@adminjs/design-system'
import React, { FC, useState } from 'react'

export type CurrencyInputWrapperProps = {
  id: string;
  initial: string;
  options?: Record<string, any>;
  onChange: Function;
} & CurrencyInputProps

export const CurrencyInputWrapper: FC<CurrencyInputWrapperProps> = (props) => {
  const { id, initial, onChange, options } = props
  const [value, setValue] = useState(initial)
  const onValueChange = (currentValue: string): void => {
    setValue(currentValue)
    onChange(currentValue)
  }
  return (
    <CurrencyInput
      id={id}
      name={id}
      value={value}
      onValueChange={onValueChange}
      {...options}
    />
  )
}
