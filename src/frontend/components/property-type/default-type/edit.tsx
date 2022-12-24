/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, memo } from 'react'
import { Input, FormMessage, FormGroup, Select } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'
import allowOverride from '../../../hoc/allow-override'

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
  if (!property.availableValues) {
    return null
  }
  const propValue = record.params?.[property.path] ?? ''
  const selected = property.availableValues.find((av) => av.value === propValue)

  return (
    <Select
      value={selected}
      options={property.availableValues}
      onChange={(s) => onChange(property.path, s?.value ?? '')}
      isDisabled={property.isDisabled}
      {...property.props}
    />
  )
}

const TextEdit: FC<CombinedProps> = (props) => {
  const { property, record, onChange } = props
  const propValue = record.params[property.path]

  return (
    <Input
      id={property.path}
      name={property.path}
      required={property.isRequired}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(property.path, e.target.value)
      }}
      value={propValue ?? ''}
      disabled={property.isDisabled}
      placeholder={propValue === null ? '<null>' : undefined}
      {...property.props}
    />
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultEditProperty')
