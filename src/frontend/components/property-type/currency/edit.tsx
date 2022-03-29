import { CurrencyInput, CurrencyInputProps, FormGroup, FormMessage } from '@adminjs/design-system'
import React, { FC, memo, useEffect, useState } from 'react'
import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'

type CurrencyEditPropertyProps = EditPropertyProps & CurrencyInputProps

const Edit: FC<CurrencyEditPropertyProps> = (props) => {
  const { onChange, property, record } = props
  const propValue = record.params?.[property.path] ?? ''
  const [value, setValue] = useState(propValue)
  const error = record.errors?.[property.path]

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <CurrencyInput
        id={property.path}
        name={property.path}
        onValueChange={setValue}
        onBlur={(): void => onChange(property.path, value)}
        value={value}
        enterKeyHint="go"
        {...property.props}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
