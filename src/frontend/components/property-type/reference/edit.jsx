import React from 'react'
import Select from 'react-select/lib/Async'
import ApiClient from '../../../utils/api-client'
import PropertyInEdit from '../../layout/property-in-edit'

import selectStyles from '../../../styles/select-styles'

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.api = new ApiClient()
  }

  handleChange(selected) {
    this.props.onChange(this.props.property.name, selected.value)
  }

  async loadOptions(inputValue) {
    const { property } = this.props
    const records = await this.api.searchRecords({
      resourceId: property.reference,
      query: inputValue,
    })
    return records.map(r => ({ value: r.id, label: r.title }))
  }

  render() {
    const { property, resource, record } = this.props
    const error = record.errors && record.errors[property.name]

    return (
      <PropertyInEdit property={property} error={error}>
        <Select
          cacheOptions
          styles={selectStyles}
          defaultOptions
          loadOptions={this.loadOptions.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </PropertyInEdit>
    )
  }
}
