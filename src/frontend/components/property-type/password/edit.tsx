/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, memo, useEffect } from 'react'
import { Input, FormGroup, InputGroup, FormMessage, Button, Icon } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props.js'
import { recordPropertyIsEqual } from '../record-property-is-equal.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const propValue = record.params[property.path]
  const [value, setValue] = useState(propValue)
  const error = record.errors && record.errors[property.path]
  const [isInput, setIsInput] = useState(false)
  const { tm } = useTranslation()

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  return (
    <FormGroup error={!!error}>
      <PropertyLabel property={property} />
      <InputGroup>
        <Input
          type={isInput ? 'input' : 'password'}
          className="input"
          id={property.path}
          name={property.path}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => onChange(property.path, value)}
          onKeyDown={(e) => e.keyCode === 13 && onChange(property.path, value)}
          value={value ?? ''}
          disabled={property.isDisabled}
          {...property.props}
        />
        <Button
          type="button"
          size="icon"
          onClick={() => setIsInput(!isInput)}
        >
          <Icon icon="Eye" />
        </Button>
      </InputGroup>
      <FormMessage>{error && tm(error.message, property.resourceId)}</FormMessage>
    </FormGroup>
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultPasswordEditProperty')
