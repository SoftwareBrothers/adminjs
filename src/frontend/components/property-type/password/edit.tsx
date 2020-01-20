import React from 'react'

import PropertyInEdit from '../../ui/property-in-edit'
import StyledInput from '../../ui/styled-input'
import { EditPropertyProps } from '../base-property-props'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params[property.name]
  const error = record.errors && record.errors[property.name]

  return (
    <PropertyInEdit property={property} error={error}>
      <StyledInput
        type="password"
        className="input"
        id={property.name}
        name={property.name}
        onChange={(event): void => onChange(property.name, event.target.value)}
        value={value}
        disabled={property.isDisabled}
      />
    </PropertyInEdit>
  )
}

export default Edit
