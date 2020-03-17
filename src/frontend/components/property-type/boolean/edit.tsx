import React, { memo } from 'react'

import { EditPropertyProps } from '../base-property-props'
import { CheckBox, FormGroup, Label, FormMessage } from '../../design-system'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, onChange, record } = props
  const value = (record.params && record.params[property.name]) || ''
  const error = record.errors && record.errors[property.name]

  return (
    <FormGroup error={!!error}>
      <CheckBox
        id={property.name}
        name={property.name}
        onChange={(): void => onChange(property.name, !value)}
        checked={value}
      />
      <Label inline htmlFor={property.name}>{property.label}</Label>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
