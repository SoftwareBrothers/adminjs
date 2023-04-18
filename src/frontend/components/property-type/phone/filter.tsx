import { PhoneInput, PhoneInputProps, FormGroup } from '@adminjs/design-system'
import React, { FC, useCallback } from 'react'

import { FilterPropertyProps } from '../base-property-props.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import allowOverride from '../../../hoc/allow-override.js'

const Filter: FC<FilterPropertyProps> = (props) => {
  const { onChange, property, filter } = props

  const handleChange = useCallback((value) => {
    onChange(property.path, value)
  }, [])

  return (
    <FormGroup variant="filter">
      <PropertyLabel property={property} filter />
      <PhoneInput
        id={property.path}
        inputProps={{ name: `filter-${property.path}` }}
        onChange={handleChange}
        value={filter[property.path]}
        {...property.props as PhoneInputProps}
      />
    </FormGroup>
  )
}

export default allowOverride(Filter, 'DefaultPhoneFilterProperty')
