import React, { memo } from 'react'

import { EditPropertyProps } from '../base-property-props'
import { DatePicker, Label, FormGroup, FormMessage } from '../../design-system'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, onChange, record } = props
  const value = (record.params && record.params[property.name]) || ''
  const error = record.errors && record.errors[property.name]

  return (
    <FormGroup error={!!error}>
      <Label htmlFor={property.name}>{property.label}</Label>
      <DatePicker
        value={value}
        disabled={property.isDisabled}
        onChange={(data: string): void => onChange(property.name, data)}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
