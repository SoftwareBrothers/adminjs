import React, { memo } from 'react'
import { DatePicker, Label, FormGroup, FormMessage } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, onChange, record } = props
  const value = (record.params && record.params[property.path]) || ''
  const error = record.errors && record.errors[property.path]

  return (
    <FormGroup error={!!error}>
      <Label
        htmlFor={property.path}
        required={property.isRequired}
      >
        {property.label}
      </Label>
      <DatePicker
        value={value}
        disabled={property.isDisabled}
        onChange={(data: string): void => onChange(property.path, data)}
        propertyType={property.type}
        {...property.props}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
