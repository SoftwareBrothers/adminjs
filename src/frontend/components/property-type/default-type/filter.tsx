import React from 'react'
import { FormGroup, Input, Select } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override.js'
import { FilterPropertyProps } from '../base-property-props.js'
import PropertyLabel from '../utils/property-label/property-label.js'
import { useTranslation } from '../../../hooks/use-translation.js'

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, onChange, filter } = props
  const { tl } = useTranslation()

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
      const availableValues = property.availableValues.map((v) => ({
        ...v,
        label: tl(`${property.path}.${v.value}`, property.resourceId, { defaultValue: v.label ?? v.value }),
      }))

      const selected = availableValues.find((av) => av.value === value)

      return (
        <Select
          variant="filter"
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={availableValues}
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
      <PropertyLabel property={property} filter />
      {renderInput()}
    </FormGroup>
  )
}

export default allowOverride(Filter, 'DefaultFilterProperty')
