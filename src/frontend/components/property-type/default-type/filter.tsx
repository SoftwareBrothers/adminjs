import React, { ReactNode } from 'react'
import { FormGroup, Label, Input, Select } from '@adminjs/design-system'

import { FilterPropertyProps } from '../base-property-props'

class Filter extends React.PureComponent<FilterPropertyProps> {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleInputChange(event): void {
    const { onChange, property } = this.props
    onChange(property.path, event.target.value)
  }

  handleSelectChange(selected): void {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.path, value)
  }

  renderInput(): ReactNode {
    const { property, filter } = this.props
    const filterKey = `filter-${property.path}`
    const value = filter[property.path] || ''
    if (property.availableValues) {
      const selected = property.availableValues.find(av => av.value === value)
      return (
        <Select
          variant="filter"
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={property.availableValues}
          onChange={this.handleSelectChange}
        />
      )
    }
    return (
      <Input
        name={filterKey}
        onChange={this.handleInputChange}
        value={value}
      />
    )
  }

  render(): ReactNode {
    const { property } = this.props
    return (
      <FormGroup variant="filter">
        <Label>{property.label}</Label>
        {this.renderInput()}
      </FormGroup>
    )
  }
}
export default Filter
