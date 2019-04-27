import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select/lib/Async'

import ApiClient from '../../../utils/api-client'
import PropertyInEdit from '../../layout/property-in-edit'
import selectStyles from '../../../styles/select-styles'
import { simplifiedPropertyType, recordType } from '../../../types'

export default class Edit extends React.Component {
  handleChange(selected) {
    const { onChange, property } = this.props
    onChange(property.name, selected.value, selected.record)
  }

  async loadOptions(inputValue) {
    const { property } = this.props
    const api = new ApiClient()

    const records = await api.searchRecords({
      resourceId: property.reference,
      query: inputValue,
    })
    return records.map(record => ({ value: record.id, label: record.title, record }))
  }

  render() {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]

    const reference = record.populated && record.populated[property.name]
    const selectedOption = reference && {
      value: reference.id,
      label: reference.title,
    }

    return (
      <PropertyInEdit property={property} error={error}>
        <Select
          cacheOptions
          value={selectedOption}
          styles={selectStyles}
          defaultOptions
          loadOptions={this.loadOptions.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </PropertyInEdit>
    )
  }
}

Edit.propTypes = {
  property: simplifiedPropertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
}
