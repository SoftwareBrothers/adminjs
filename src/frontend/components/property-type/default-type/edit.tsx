/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, useState, memo, useEffect } from 'react'
import { Input, FormMessage, FormGroup, Select } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props.js'
import { recordPropertyIsEqual } from '../record-property-is-equal.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'

type CombinedProps = EditPropertyProps

const Edit: FC<CombinedProps> = (props) => {
  const { property, record } = props
  const error = record.errors?.[property.path]

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      {property.availableValues ? <SelectEdit {...props} /> : <TextEdit {...props} />}
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

const SelectEdit: FC<CombinedProps> = (props) => {
  const { record, property, onChange } = props
  const { tl } = useTranslation()
  if (!property.availableValues) {
    return null
  }

  const propValue = record.params?.[property.path] ?? property.props.value ?? ''
  // eslint-disable-next-line max-len
  const availableValues = property.availableValues.map((v) => ({
    ...v,
    label: tl(`${property.path}.${v.value}`, property.resourceId, { defaultValue: v.label ?? v.value }),
  }))
  // eslint-disable-next-line eqeqeq
  const selected = availableValues.find((av) => av.value == propValue)

  return (
    <Select
      value={selected}
      options={availableValues}
      onChange={(s) => onChange(property.path, s?.value ?? '')}
      isDisabled={property.isDisabled}
      {...property.props}
    />
  )
}

const TextEdit: FC<CombinedProps> = (props) => {
  const { property, record, onChange } = props
  const propValue = record.params?.[property.path] ?? property.props.value ?? ''
  const [value, setValue] = useState(propValue)

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  return (
    <Input
      id={property.path}
      name={property.path}
      required={property.isRequired}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onChange(property.path, value)}
      // handle clicking ENTER
      onKeyDown={(e) => e.keyCode === 13 && onChange(property.path, value)}
      value={value}
      disabled={property.isDisabled}
      {...property.props}
    />
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultEditProperty')
