import React from 'react'
import { Box, FormGroup, Input, Select } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override.js'
import { FilterPropertyProps } from '../base-property-props.js'
import PropertyLabel from '../utils/property-label/property-label.js'
import { useTranslation } from '../../../hooks/use-translation.js'
import * as BackendFilter from '../../../../backend/utils/filter/filter.js'

const { PARAM_SEPARATOR } = BackendFilter

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, onChange, filter } = props

  const possibleKeys = [
    property.path,
    `${property.path}${PARAM_SEPARATOR}equals`,
    `${property.path}${PARAM_SEPARATOR}startsWith`,
    `${property.path}${PARAM_SEPARATOR}endsWith`,
  ]

  const [currentKey, currentInput] = Object.entries(filter).find(
    ([key]) => possibleKeys.includes(key),
  ) || []
  const currentOperator = (currentKey ? currentKey.split(PARAM_SEPARATOR)[1] : 'contains') || 'contains'

  const { tl } = useTranslation()

  const handleInputInComboChange = (event) => {
    if (currentOperator === 'contains') {
      onChange(property.path, event.target.value)
    } else {
      const key = `${property.path}${PARAM_SEPARATOR}${currentOperator}`
      onChange(key, event.target.value)
    }
  }

  const handleSelectChange = (selected) => {
    const value = selected ? selected.value : ''
    onChange(property.path, value)
  }

  const handleSelectInComboChange = (selected) => {
    const changedKey = ((selected?.value || 'contains') !== 'contains') ? `${property.path}${PARAM_SEPARATOR}${selected.value}` : property.path

    possibleKeys.forEach((key) => {
      if (key !== changedKey) {
        delete filter[key]
      }
    })
    onChange(changedKey, currentInput || '')
  }

  const renderInput = () => {
    const valueKey = currentOperator === 'contains' ? property.path : `${property.path}${PARAM_SEPARATOR}${currentOperator}`

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

    const operator = { label: currentOperator, value: currentOperator }
    return (
      <Box flex flexDirection="row">
        <Box flexGrow={0}>
          <Input
            name={filterKey}
            onChange={handleInputInComboChange}
            value={filter[currentKey || property.path] || ''}
          />
        </Box>
        <Box flexGrow={1}>
          <Select
            value={operator}
            options={[
              {
                label: 'contains',
                value: 'contains',
              },
              {
                label: 'equals',
                value: 'equals',
              },
              {
                label: 'startsWith',
                value: 'startsWith',
              },
              {
                label: 'endsWith',
                value: 'endsWith',
              },
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
