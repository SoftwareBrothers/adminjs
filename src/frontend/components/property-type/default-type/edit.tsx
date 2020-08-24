/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, useState, memo, useEffect } from 'react'
import Select from 'react-select'
import { withTheme, DefaultTheme } from 'styled-components'
import { Input, FormMessage, FormGroup, Label, selectStyles } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import usePrevious from '../../../utils/usePrevious'

type CombinedProps = EditPropertyProps & {theme: DefaultTheme}

const getNumberProps = (type, options) : object => {
  if (type !== 'number' && type !== 'float') {
    return {}
  }
  let min = options.min
  let max = options.max
  if (typeof min === 'undefined') {
    min = type === 'number' ? Number.MIN_SAFE_INTEGER : Number.MIN_VALUE
  }
  if (typeof max === 'undefined') {
    max = type === 'number' ? Number.MAX_SAFE_INTEGER : Number.MAX_VALUE
  }
  return {
    type: 'number',
    min,
    max,
    step: options.step || 1,
  }
}

const Edit: FC<CombinedProps> = (props) => {
  const { property, record } = props
  const error = record.errors?.[property.name]
  return (
    <FormGroup error={Boolean(error)}>
      <Label
        htmlFor={property.name}
        required={property.isRequired}
      >
        {property.label}
      </Label>
      {property.availableValues ? <SelectEdit {...props} /> : <TextEdit {...props} />}
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

const SelectEdit: FC<CombinedProps> = (props) => {
  const { theme, record, property, onChange } = props
  if (!property.availableValues) {
    return null
  }
  const propValue = record.params?.[property.name] ?? ''
  const styles = selectStyles(theme)
  const selected = property.availableValues.find(av => av.value === propValue)
  return (
    <Select
      isClearable
      styles={styles}
      value={selected}
      options={property.availableValues}
      onChange={s => onChange(property.name, s?.value ?? '')}
      isDisabled={property.isDisabled}
    />
  )
}

const TextEdit: FC<CombinedProps> = (props) => {
  const { property, record, onChange } = props
  const propValue = record.params?.[property.name] ?? ''
  const [value, setValue] = useState(propValue)
  const numberProps = getNumberProps(property.type, property.custom)

  const previous = usePrevious(propValue)
  useEffect(() => {
    // this means props updated
    if (propValue !== previous) {
      setValue(propValue)
    }
  }, [])

  return (
    <Input
      id={property.name}
      name={property.name}
      onChange={e => setValue(e.target.value)}
      onBlur={() => onChange(property.name, value)}
      value={value}
      disabled={property.isDisabled}
      {...numberProps}
    />
  )
}

export default withTheme(memo(Edit, recordPropertyIsEqual))
