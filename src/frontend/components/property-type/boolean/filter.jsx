import React from 'react'

import Select from 'react-select'
import mapValue from './map-value'

export default class Filter extends React.PureComponent {
  handleChange(selected) {
    this.props.onChange(this.props.property.name, selected.value)
  }

  render() {
    const { property, filter } = this.props
    const filterKey = `filter-${property.name}`
    const value = filter[property.name]
    const options = [
      {value: '', label: "-- All --"},
      {value: true, label: mapValue(true)},
      {value: false, label: mapValue(false)},
    ]
    return (
      <div className="filter">
        <label htmlFor={filterKey} className="label">{property.label} contains:</label>
        <div className="control">
          <Select
            options={options}
            onChange={this.handleChange.bind(this)}
            />
        </div>
      </div>
    )
  }
}
