import React, { memo } from 'react'
import { DatePicker, FormGroup, FormMessage } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props.js'
import { recordPropertyIsEqual } from '../record-property-is-equal.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'
import { PropertyType } from '../../../../backend/index.js'

const formatDate = (val:string|null, propertyType: PropertyType) => {
  if (val) return (propertyType === 'date' ? `${val}T00:00:00` : val)
  return ''
}

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, onChange, record } = props
  const value = record.params ? formatDate(record.params[property.path], property.type) : ''
  const error = record.errors && record.errors[property.path]
  const { tm } = useTranslation()

  return (
    <FormGroup error={!!error}>
      <PropertyLabel property={property} />
      <DatePicker
        value={value}
        disabled={property.isDisabled}
        onChange={(date) => {
          onChange(property.path, property.type === 'date' ? date?.substring(0, 10) ?? date : date)
        }}
        propertyType={property.type}
        {...property.props}
      />
      <FormMessage>{error && tm(error.message, property.resourceId)}</FormMessage>
    </FormGroup>
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultDatetimeEditProperty')
