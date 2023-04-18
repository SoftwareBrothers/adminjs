import React from 'react'
import { FormGroup, Select } from '@adminjs/design-system'

import mapValue from './map-value.js'
import { FilterPropertyProps } from '../base-property-props.js'
import allowOverride from '../../../hoc/allow-override.js'
import PropertyLabel from '../utils/property-label/property-label.js'

const boolValue = (s: string): boolean => {
  if (/true/i.test(s)) {
    return true
  }
  return false
}

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, filter = {}, onChange } = props
  const value = typeof filter[property.path] === 'undefined' ? '' : boolValue(filter[property.path])
  const options = [
    { value: true, label: mapValue(true) },
    { value: false, label: mapValue(false) },
  ]
  const selected = options.find((o) => o.value === value)
  const handleChange = (s) => {
    const newValue = s ? s.value : undefined
    onChange(property.path, newValue)
  }

  return (
    <FormGroup>
      <PropertyLabel property={property} filter />
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
