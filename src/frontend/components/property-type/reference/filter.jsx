import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select/lib/Async'
import ApiClient from '../../../utils/api-client'

import PropertyInFilter from '../../ui/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'
import { propertyType } from '../../../types'

export default class Filter extends React.PureComponent {
  handleChange(selected) {
    const { onChange, property } = this.props
    onChange(property.name, selected ? selected.value : '')
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
    const { property } = this.props
    return (
      <PropertyInFilter property={property}>
        <Select
          isClearable
          cacheOptions
          styles={filterStyles}
          loadOptions={this.loadOptions.bind(this)}
          onChange={this.handleChange.bind(this)}
          defaultOptions
        />
      </PropertyInFilter>
    )
  }
}

Filter.propTypes = {
  property: propertyType.isRequired,
  onChange: PropTypes.func.isRequired,
}
