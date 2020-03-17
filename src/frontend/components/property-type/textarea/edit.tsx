import React, { useCallback, memo } from 'react'

import { EditPropertyProps } from '../base-property-props'
import { Input, Label, FormGroup, FormMessage } from '../../design-system'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { onChange, property, record } = props

  const handleInputChange = useCallback((event): void => {
    onChange(property.name, event.target.value)
  }, [onChange, property.name])

  const value = (
    record.params
    && typeof record.params[property.name] !== 'undefined'
    && record.params[property.name] !== null
  )
    ? record.params[property.name]
    : ''

  const error = record.errors && record.errors[property.name]

  return (
    <FormGroup error={!!error}>
      <Label htmlFor={property.name}>{property.label}</Label>
      <Input
        as="textarea"
        rows={(value.match(/\n/g) || []).length + 1}
        id={property.name}
        name={property.name}
        onChange={handleInputChange}
        value={value}
        disabled={property.isDisabled}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
