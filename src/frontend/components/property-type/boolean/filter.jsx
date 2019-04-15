import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

import mapValue from './map-value'
import PropertyInFilter from '../../layout/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'
import { propertyType } from '../../../types'

export default class Filter extends React.PureComponent {
  handleChange(selected) {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  render() {
    const { property } = this.props
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

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  property: propertyType.isRequired,
}
