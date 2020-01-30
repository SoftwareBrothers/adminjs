import React, { ReactNode } from 'react'

import { EditPropertyProps } from '../base-property-props'
import { Input, Label, FormGroup, FormMessage } from '../../design-system'

class Edit extends React.Component<EditPropertyProps> {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event): void {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  render(): ReactNode {
    const { property, record } = this.props
    const value = (
      record.params
      && typeof record.params[property.name] !== 'undefined'
      && record.params[property.name] !== null
    )
      ? record.params[property.name]
      : ''
    const error = record.errors && record.errors[property.name]
    return (
      <FormGroup error={!!error}>
        <Label htmlFor={property.name}>{property.label}</Label>
        <Input
          as="textarea"
          rows={(value.match(/\n/g) || []).length + 1}
          id={property.name}
          name={property.name}
          onChange={this.handleInputChange}
          value={value}
          disabled={property.isDisabled}
        />
        <FormMessage>{error && error.message}</FormMessage>
      </FormGroup>
    )
  }
}

export default Edit
