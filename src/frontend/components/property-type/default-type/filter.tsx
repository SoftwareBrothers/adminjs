import React from 'react'
import { Box, FormGroup, Input, Select } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override.js'
import { FilterPropertyProps } from '../base-property-props.js'
import PropertyLabel from '../utils/property-label/property-label.js'
import { useTranslation } from '../../../hooks/use-translation.js'
import * as BackendFilter from '../../../../backend/utils/filter/filter.js'

const { MATCHING_PATTERNS, OPERATOR_SEPARATOR, OPERATORS, PARAM_SEPARATOR } = BackendFilter

const getKey = (path:string, patternMatching: string, operator:string) => {
  if (patternMatching === MATCHING_PATTERNS.CO) {
    if (operator === OPERATORS.AND) {
      return path
    }

    return `${path}${PARAM_SEPARATOR}${operator}`
  }
  if (operator === OPERATORS.AND) {
    return `${path}${PARAM_SEPARATOR}${patternMatching}`
  }
  return `${path}${PARAM_SEPARATOR}${operator}${OPERATOR_SEPARATOR}${patternMatching}`
}

const generatePossibleKeys = (path:string) => {
  const possibleKeys:string[] = []

  for (const matchingPattern of Object.values(MATCHING_PATTERNS)) {
    for (const operator of Object.values(OPERATORS)) {
      possibleKeys.push(getKey(path, matchingPattern, operator))
    }
  }

  return possibleKeys
}

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, onChange, filter } = props

  const possibleKeys = generatePossibleKeys(property.path)

  const [currentKey, currentInput] = Object.entries(filter).find(
    ([key]) => possibleKeys.includes(key),
  ) || []
  let currentPatternMatching = MATCHING_PATTERNS.CO
  let currentOperator = OPERATORS.AND

  if (currentKey) {
    const filterProperties = currentKey.split(PARAM_SEPARATOR)
    const param = (filterProperties[1] || '').split(OPERATOR_SEPARATOR)
    const tentativeOperator = param[0] || ''
    const tentativeMatchingPattern = (param.length > 1 ? param[1] : param[0]) || ''
    currentOperator = Object.values(OPERATORS).includes(tentativeOperator)
      ? tentativeOperator : OPERATORS.AND
    currentPatternMatching = Object.values(MATCHING_PATTERNS).includes(tentativeMatchingPattern)
      ? tentativeMatchingPattern : MATCHING_PATTERNS.CO
  }

  const { tl } = useTranslation()

  const handleInputChange = (event) => {
    onChange(property.path, event.target.value)
  }

  const handleInputInComboChange = (event) => {
    const key = getKey(property.path, currentPatternMatching, currentOperator)
    onChange(key, event.target.value)
  }

  const handleSelectChange = (selected) => {
    const value = selected ? selected.value : ''
    onChange(property.path, value)
  }

  const handleSelectPatternMatchingInComboChange = (selected) => {
    const changedKey = getKey(
      property.path,
      selected?.value || MATCHING_PATTERNS.CO,
      currentOperator,
    )

    possibleKeys.forEach((key) => {
      if (key !== changedKey) {
        delete filter[key]
      }
    })
    onChange(changedKey, currentInput || '')
  }

  const handleSelectOperatorInComboChange = (selected) => {
    const changedKey = getKey(
      property.path,
      currentPatternMatching,
      selected?.value || OPERATORS.AND,
    )

    possibleKeys.forEach((key) => {
      if (key !== changedKey) {
        delete filter[key]
      }
    })
    onChange(changedKey, currentInput || '')
  }

  const renderInput = () => {
    const valueKey = getKey(property.path, currentPatternMatching, currentOperator)

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

    if (property.type === 'string') {
      const patternMatching = { label: currentPatternMatching, value: currentPatternMatching }
      const operator = { label: currentOperator, value: currentOperator }
      return (
        <Box flex flexDirection="column">
          <Input
            name={filterKey}
            onChange={handleInputInComboChange}
            value={filter[currentKey || property.path] || ''}
          />
          <Box flex flexDirection="row">
            <Box flexGrow={1}>
              <Select
                value={patternMatching}
                options={[
                  {
                    label: MATCHING_PATTERNS.CO,
                    value: MATCHING_PATTERNS.CO,
                  },
                  {
                    label: MATCHING_PATTERNS.EQ,
                    value: MATCHING_PATTERNS.EQ,
                  },
                  {
                    label: MATCHING_PATTERNS.NE,
                    value: MATCHING_PATTERNS.NE,
                  },
                  {
                    label: MATCHING_PATTERNS.SW,
                    value: MATCHING_PATTERNS.SW,
                  },
                  {
                    label: MATCHING_PATTERNS.EW,
                    value: MATCHING_PATTERNS.EW,
                  },
                ]}
                onChange={handleSelectPatternMatchingInComboChange}
              />
            </Box>
            <Box flexGrow={1}>
              <Select
                value={operator}
                options={[
                  {
                    label: OPERATORS.AND,
                    value: OPERATORS.AND,
                  },
                  {
                    label: OPERATORS.OR,
                    value: OPERATORS.OR,
                  },
                ]}
                onChange={handleSelectOperatorInComboChange}
              />
            </Box>
          </Box>
        </Box>
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
