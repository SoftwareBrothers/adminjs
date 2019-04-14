import React from 'react'
import Select from 'react-select'

import mapValue from './map-value'
import PropertyInFilter from '../../layout/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'

export default class Filter extends React.PureComponent {
  handleChange(selected) {
    const value = selected ? selected.value : ''
    this.props.onChange(this.props.property.name, value)
  }

  render() {
    const { property, filter } = this.props
    const filterKey = `filter-${property.name}`
    const value = filter[property.name]
    const options = [
      { value: true, label: mapValue(true) },
      { value: false, label: mapValue(false) },
    ]
    return (
      <PropertyInFilter property={property}>
        <Select
          isClearable
          options={options}
          styles={filterStyles}
          onChange={this.handleChange.bind(this)}
        />
      </PropertyInFilter>
    )
  }
}
