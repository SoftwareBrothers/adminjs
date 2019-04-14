import React from 'react'
import Select from 'react-select/lib/Async'
import ApiClient from '../../../utils/api-client'

import PropertyInFilter from '../../layout/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'

export default class Filter extends React.PureComponent {
  handleChange(selected) {
    this.props.onChange(this.props.property.name, selected ? selected.value : '')
  }

  async loadOptions(inputValue) {
    this.api = new ApiClient()
    const { property } = this.props
    const records = await this.api.searchRecords({
      resourceId: property.reference,
      query: inputValue,
    })
    return records.map(r => ({ value: r.id, label: r.title }))
  }

  render() {
    const { property, filter } = this.props
    const filterKey = `filter-${property.name}`
    const value = {value: filter[property.name] || ''}
    return (
      <PropertyInFilter property={property}>
        <Select
          isClearable
          cacheOptions
          styles={filterStyles}
          loadOptions={this.loadOptions.bind(this)}
          onChange={this.handleChange.bind(this)}
          defaultOptions={true}
        />
      </PropertyInFilter>
    )
  }
}
