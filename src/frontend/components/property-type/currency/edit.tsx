import { CurrencyInputProps, FormGroup, FormMessage } from '@adminjs/design-system'
import React, { FC, memo } from 'react'
import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'
import { CurrencyInputWrapper } from './currency-input-wrapper'

type CurrencyEditPropertyProps = EditPropertyProps & CurrencyInputProps

const Edit: FC<CurrencyEditPropertyProps> = (props) => {
  const { onChange, property, record } = props
  const propValue = record.params?.[property.path] ?? ''
  const error = record.errors?.[property.path]

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <CurrencyInputWrapper
        id={property.path}
        initial={propValue}
        options={property.props}
        onChange={(value: string): void => onChange(property.path, value)}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
