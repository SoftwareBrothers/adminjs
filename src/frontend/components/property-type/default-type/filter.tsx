import React, { ReactNode } from 'react'
import Select from 'react-select'
import { withTheme, ThemeProps, DefaultTheme } from 'styled-components'
import { FormGroup, Label, Input, filterStyles } from '@admin-bro/design-system'

import { FilterPropertyProps } from '../base-property-props'

class Filter extends React.PureComponent<FilterPropertyProps & ThemeProps<DefaultTheme>> {
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

  getNumberProps(type, options): object {
    if (type !== 'number' && type !== 'float') {
      return {}
    }
    let min = options.min
    let max = options.max
    if (typeof min === 'undefined') {
      min = type === 'number' ? Number.MIN_SAFE_INTEGER : Number.MIN_VALUE
    }
    if (typeof max === 'undefined') {
      max = type === 'number' ? Number.MAX_SAFE_INTEGER : Number.MAX_VALUE
    }
    return {
      type: 'number',
      min,
      max,
      step: options.step || 1,
    }
  }

  renderInput(): ReactNode {
    const { property, filter, theme } = this.props
    const filterKey = `filter-${property.name}`
    const value = filter[property.name] || ''
    const numberProps = this.getNumberProps(property.type, property.custom)
    if (property.availableValues) {
      const selected = property.availableValues.find(av => av.value === value)
      return (
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={property.availableValues}
          styles={filterStyles(theme)}
          onChange={this.handleSelectChange}
        />
      )
    }
    return (
      <Input
        name={filterKey}
        onChange={this.handleInputChange}
        value={value}
        {...numberProps}
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
export default withTheme(Filter)
