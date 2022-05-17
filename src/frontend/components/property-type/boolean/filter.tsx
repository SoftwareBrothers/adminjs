import React, { ReactNode } from 'react'
import { FormGroup, Label, Select } from '@adminjs/design-system'

import mapValue from './map-value'
import { FilterPropertyProps } from '../base-property-props'

class Filter extends React.PureComponent<FilterPropertyProps> {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected): void {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.path, value)
  }

  render(): ReactNode {
    const { property, filter = {} } = this.props
    const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path]
    const options = [
      { value: true, label: mapValue(true) },
      { value: false, label: mapValue(false) },
    ]
    const selected = options.find(o => o.value === value)
    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <Select
          variant="filter"
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={options}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
  }
}

export default Filter
