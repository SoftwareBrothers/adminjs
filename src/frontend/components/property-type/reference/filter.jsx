import React from 'react'
import Select from 'react-select/lib/Async'
import ApiClient from '../../../utils/api-client'

export default class Filter extends React.PureComponent {
  handleChange(selected) {
    this.props.onChange(this.props.property.name, selected ? selected.value : '')
  }

  async loadOptions(inputValue) {
    this.api = new ApiClient()
    const { property } = this.props
    const records = await this.api.searchRecords(property.reference, inputValue)
    return records.map(r => ({ value: r.id, label: r.title }))
  }

  render() {
    const { property, filter } = this.props
    const filterKey = `filter-${property.name}`
    const value = {value: filter[property.name] || ''}
    return (
      <div className="filter">
        <label htmlFor={filterKey} className="label">{property.label} contains:</label>
        <div className="control">
          <Select
            isClearable={true}
            cacheOptions
            loadOptions={this.loadOptions.bind(this)}
            onChange={this.handleChange.bind(this)}
            defaultOptions={true}
          />
        </div>
      </div>
    )
  }
}
