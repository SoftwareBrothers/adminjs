import React, { useState } from 'react'
import { Box, FormGroup, Input, Select } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override.js'
import { FilterPropertyProps } from '../base-property-props.js'
import PropertyLabel from '../utils/property-label/property-label.js'
import { useTranslation } from '../../../hooks/use-translation.js'
import * as BackendFilter from '../../../../backend/utils/filter/filter.js'

const { PARAM_SEPARATOR } = BackendFilter

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, onChange, filter } = props
  const [operator, setOperator] = useState({label: 'contains', value: 'contains'})
  const { tl } = useTranslation()

  const handleInputInComboChange = (event) => {
    if(operator.value === 'contains') {
      onChange(property.path, event.target.value)  
    } else {
      const key = `${property.path}${PARAM_SEPARATOR}${operator.value}`
      onChange(key, event.target.value)  
    }
  }

  const handleSelectChange = (selected) => {
    const value = selected ? selected.value : ''
    onChange(property.path, value)
  }

  const handleSelectInComboChange = (selected) => {
    setOperator(selected)
  }

  const renderInput = () => {
    const operatorValue = operator.value
    const valueKey = operatorValue === 'contains'?property.path:`${property.path}${PARAM_SEPARATOR}${operatorValue}`
    const filterKey = `filter-${valueKey}`
    const value = filter[valueKey] || ''
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
      <Box variant="white" flex flexDirection="row">
      <Box flexShrink={0}>
      <Input
          name={filterKey}
          onChange={handleInputInComboChange}
          value={value}
        />
      </Box>
      <Box flexShrink={0}>
      <Select
          value={operator}
          options={[
            {
              label: 'contains',
              value: 'contains'
            },
            {
              label: 'equal',
              value: 'equal'
            },
            {
              label: 'startsWith',
              value: 'startsWith'
            },
            {
              label: 'endsWith',
              value: 'endsWith'
            }
          ]}
          onChange={handleSelectInComboChange}
        />
      </Box>
    </Box>
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
