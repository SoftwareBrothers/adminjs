import React, { useState, memo } from 'react'

import { EditPropertyProps } from '../base-property-props'
import { Label, Input, FormGroup, InputGroup, FormMessage, Button, Icon } from '../../design-system'
import { recordPropertyIsEqual } from '../record-property-is-equal'

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params[property.name]
  const error = record.errors && record.errors[property.name]

  const [isInput, setIsInput] = useState(false)

  return (
    <FormGroup error={!!error}>
      <Label htmlFor={property.name}>{property.label}</Label>
      <InputGroup>
        <Input
          type={isInput ? 'input' : 'password'}
          className="input"
          id={property.name}
          name={property.name}
          onChange={(event): void => onChange(property.name, event.target.value)}
          value={value ?? ''}
          disabled={property.isDisabled}
        />
        <Button
          variant={isInput ? 'primary' : 'text'}
          type="button"
          size="icon"
          onClick={(): void => setIsInput(!isInput)}
        >
          <Icon icon="View" />
        </Button>
      </InputGroup>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
