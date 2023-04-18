import { CurrencyInput, CurrencyInputProps, FormGroup } from '@adminjs/design-system'
import React, { FC } from 'react'

import { EditPropertyProps } from '../base-property-props.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import allowOverride from '../../../hoc/allow-override.js'

const Filter: FC<EditPropertyProps> = (props) => {
  const { onChange, property, filter } = props

  const handleChange = (value) => {
    onChange(property.path, value)
  }

  return (
    <FormGroup variant="filter">
      <PropertyLabel property={property} filter />
      <CurrencyInput
        id={property.path}
        name={`filter-${property.path}`}
        onValueChange={handleChange}
        value={filter[property.path]}
        {...property.props as CurrencyInputProps}
      />
    </FormGroup>
  )
}

export default allowOverride(Filter, 'DefaultCurrencyFilterProperty')
