/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, memo, useEffect } from 'react'
import { Label, Input, FormGroup, InputGroup, FormMessage, Button, Icon } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const propValue = record.params[property.name]
  const [value, setValue] = useState(propValue)
  const error = record.errors && record.errors[property.name]
  const [isInput, setIsInput] = useState(false)

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  return (
    <FormGroup error={!!error}>
      <Label
        htmlFor={property.name}
        required={property.isRequired}
      >
        {property.label}
      </Label>
      <InputGroup>
        <Input
          type={isInput ? 'input' : 'password'}
          className="input"
          id={property.name}
          name={property.name}
          onChange={event => setValue(event.target.value)}
          onBlur={() => onChange(property.name, value)}
          onKeyDown={e => e.keyCode === 13 && onChange(property.name, value)}
          value={value ?? ''}
          disabled={property.isDisabled}
        />
        <Button
          variant={isInput ? 'primary' : 'text'}
          type="button"
          size="icon"
          onClick={() => setIsInput(!isInput)}
        >
          <Icon icon="View" />
        </Button>
      </InputGroup>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
