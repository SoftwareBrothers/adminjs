import React from 'react'
import Select from 'react-select/lib/Async'
import ApiClient from '../../../utils/api-client'

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
    const value = (record.params && record.params[property.name]) || ''
    const error = record.errors && record.errors[property.name]

    return (
      <div className="field">
        <label htmlFor={property.name} className="label">{property.label}</label>
        <div className="control">
        <Select
          cacheOptions
          defaultOptions
          loadOptions={this.loadOptions.bind(this)}
          onChange={this.handleChange.bind(this)}
          />
        </div>
        {error && (
          <div className="help is-danger">{error.message}</div>
        )}
      </div>
    )
  }
}
