import React from 'react'

import PropertyInEdit from '../../ui/property-in-edit'
import { EditPropertyProps } from '../base-property-props'
import { CheckBox } from '../../design-system'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, onChange, record } = props
  const value = (record.params && record.params[property.name]) || ''
  const error = record.errors && record.errors[property.name]

  return (
    <PropertyInEdit property={property} error={error}>
      <CheckBox
        id={property.name}
        name={property.name}
        onChange={(): void => onChange(property.name, !value)}
        checked={value}
      />
    </PropertyInEdit>
  )
}

export default Edit
