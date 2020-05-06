import React, { memo } from 'react'

import { EditPropertyProps } from '../base-property-props'
import { CheckBox, FormGroup, Label, FormMessage } from '../../design-system'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const parseValue = (value): boolean => !(!value || value === 'false')

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, onChange, record } = props
  const value = parseValue(record.params && record.params[property.name])
  const error = record.errors && record.errors[property.name]

  const handleChange = (): void => {
    if (!property.isDisabled) {
      onChange(property.name, !value)
    }
  }

  return (
    <FormGroup error={!!error}>
      <CheckBox
        id={property.name}
        name={property.name}
        onChange={handleChange}
        checked={value}
        disabled={property.isDisabled}
      />
      <Label inline htmlFor={property.name}>{property.label}</Label>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
