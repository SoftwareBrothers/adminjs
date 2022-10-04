import React, { memo } from 'react'
import { DatePicker, FormGroup, FormMessage } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'
import allowOverride from '../../../hoc/allow-override'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, onChange, record } = props
  const value = (record.params && record.params[property.path]) || ''
  const error = record.errors && record.errors[property.path]

  return (
    <FormGroup error={!!error}>
      <PropertyLabel property={property} />
      <DatePicker
        value={value}
        disabled={property.isDisabled}
        onChange={(date) => onChange(property.path, date)}
        propertyType={property.type}
        {...property.props}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultDatetimeEditProperty')
