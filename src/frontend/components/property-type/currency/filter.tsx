import { CurrencyInput, CurrencyInputProps, FormGroup } from '@adminjs/design-system'
import React, { FC } from 'react'
import { EditPropertyProps } from '../base-property-props'
import { PropertyLabel } from '../utils/property-label'

type CurrencyEditPropertyProps = EditPropertyProps & CurrencyInputProps

const Filter: FC<CurrencyEditPropertyProps> = (props) => {
  const { onChange, property, filter } = props

  const handleChange = (value) => {
    onChange(property.path, value)
  }

  return (
    <FormGroup variant="filter">
      <PropertyLabel property={property} />
      <CurrencyInput
        id={property.path}
        name={`filter-${property.path}`}
        onValueChange={handleChange}
        value={filter[property.path]}
        {...property.props}
      />
    </FormGroup>
  )
}

export default Filter
