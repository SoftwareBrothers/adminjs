import React, { ReactNode } from 'react'
import Select from 'react-select'

import PropertyInEdit from '../../ui/property-in-edit'
import StyledInput from '../../ui/styled-input'
import { PropertyProps } from '../base-property-props'

export default class Edit extends React.Component<PropertyProps> {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleInputChange(event): void {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  handleSelectChange(selected): void {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  renderInput(): ReactNode {
    const { property, record } = this.props
    const value = (record.params && typeof record.params[property.name] !== 'undefined')
      ? record.params[property.name]
      : ''
    if (property.availableValues) {
      const selected = property.availableValues.find(av => av.value === value)
      return (
        <Select
          isClearable
          value={selected}
          options={property.availableValues}
          onChange={this.handleSelectChange}
        />
      )
    }
    return (
      <StyledInput
        type="text"
        className="input"
        id={property.name}
        name={property.name}
        onChange={this.handleInputChange}
        value={value}
      />
    )
  }

  render(): ReactNode {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        {this.renderInput()}
      </PropertyInEdit>
    )
  }
}
