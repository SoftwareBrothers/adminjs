import React, { ReactNode } from 'react'
import Select from 'react-select'

import mapValue from './map-value'
import PropertyInFilter from '../../ui/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'
import { BasePropertyProps } from '../base-property-props'

export default class Filter extends React.PureComponent<BasePropertyProps> {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected): void {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  render(): ReactNode {
    const { property, filter = {} } = this.props
    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name]
    const options = [
      { value: true, label: mapValue(true) },
      { value: false, label: mapValue(false) },
    ]
    const selected = options.find(o => o.value === value)
    return (
      <PropertyInFilter property={property}>
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={options}
          styles={filterStyles}
          onChange={this.handleChange}
        />
      </PropertyInFilter>
    )
  }
}
