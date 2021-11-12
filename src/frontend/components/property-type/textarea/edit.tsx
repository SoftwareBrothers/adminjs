/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { memo, useState, FC, useEffect } from 'react'
import { Input, FormGroup, FormMessage } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'

const Edit: FC<EditPropertyProps> = (props) => {
  const { onChange, property, record } = props
  const propValue = record.params?.[property.path] ?? ''
  const [value, setValue] = useState(propValue)
  const error = record.errors?.[property.path]

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <Input
        as="textarea"
        rows={(value.match(/\n/g) || []).length + 1}
        id={property.path}
        name={property.path}
        onChange={e => setValue(e.target.value)}
        onBlur={() => onChange(property.path, value)}
        value={value}
        disabled={property.isDisabled}
        {...property.props}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
