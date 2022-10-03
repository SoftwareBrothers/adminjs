import React from 'react'
import { FormGroup, Label, Select } from '@adminjs/design-system'

import mapValue from './map-value'
import { FilterPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, filter = {}, onChange } = props
  const value = typeof filter[property.path] === 'undefined' ? '' : Boolean(filter[property.path])
  const options = [
    { value: true, label: mapValue(true) },
    { value: false, label: mapValue(false) },
  ]
  const selected = options.find((o) => o.value === value)

  const handleChange = (s) => {
    const newValue = s ? s.value : ''
    onChange(property.path, newValue)
  }

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <Select
        variant="filter"
        value={typeof selected === 'undefined' ? '' : selected}
        isClearable
        options={options}
        onChange={handleChange}
      />
    </FormGroup>
  )
}

export default allowOverride(Filter, 'DefaultBooleanFilterProperty')
