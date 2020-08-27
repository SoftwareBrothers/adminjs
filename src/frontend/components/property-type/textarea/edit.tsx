/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { memo, useState, FC, useEffect } from 'react'
import { Input, Label, FormGroup, FormMessage } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const Edit: FC<EditPropertyProps> = (props) => {
  const { onChange, property, record } = props
  const propValue = record.params?.[property.name] ?? ''
  const [value, setValue] = useState(propValue)
  const error = record.errors?.[property.name]

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  return (
    <FormGroup error={Boolean(error)}>
      <Label
        htmlFor={property.name}
        required={property.isRequired}
      >
        {property.label}
      </Label>
      <Input
        as="textarea"
        rows={(value.match(/\n/g) || []).length + 1}
        id={property.name}
        name={property.name}
        onChange={e => setValue(e.target.value)}
        onBlur={() => onChange(property.name, value)}
        value={value}
        disabled={property.isDisabled}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
