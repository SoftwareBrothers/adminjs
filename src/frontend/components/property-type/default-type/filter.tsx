import React from 'react'
import { FormGroup, Label, Input, Select } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override'
import { FilterPropertyProps } from '../base-property-props'

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, onChange, filter } = props

  const handleInputChange = (event) => {
    onChange(property.path, event.target.value)
  }

  const handleSelectChange = (selected) => {
    const value = selected ? selected.value : ''
    onChange(property.path, value)
  }

  const renderInput = () => {
    const filterKey = `filter-${property.path}`
    const value = filter[property.path] || ''
    if (property.availableValues) {
      const selected = property.availableValues.find((av) => av.value === value)
      return (
        <Select
          variant="filter"
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={property.availableValues}
          onChange={handleSelectChange}
        />
      )
    }
    return (
      <Input
        name={filterKey}
        onChange={handleInputChange}
        value={value}
      />
    )
  }

  return (
    <FormGroup variant="filter">
      <Label>{property.label}</Label>
      {renderInput()}
    </FormGroup>
  )
}

export default allowOverride(Filter, 'DefaultFilterProperty')
