import { PhoneInput, PhoneInputProps, FormGroup } from '@adminjs/design-system'
import React, { FC, useCallback } from 'react'
import { EditPropertyProps } from '../base-property-props'
import { PropertyLabel } from '../utils/property-label'

type PhoneEditPropertyProps = EditPropertyProps & PhoneInputProps

const Filter: FC<PhoneEditPropertyProps> = (props) => {
  const { onChange, property, filter } = props

  const handleChange = useCallback((value) => {
    onChange(property.path, value)
  }, [])

  return (
    <FormGroup variant="filter">
      <PropertyLabel property={property} />
      <PhoneInput
        id={property.path}
        inputProps={{
          name: `filter-${property.path}`,
        }}
        onChange={handleChange}
        value={filter[property.path]}
        {...property.props}
      />
    </FormGroup>
  )
}

export default Filter
