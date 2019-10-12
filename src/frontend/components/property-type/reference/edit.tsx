import React, { ReactNode } from 'react'
import Select from 'react-select/lib/Async'

import ApiClient from '../../../utils/api-client'
import PropertyInEdit from '../../ui/property-in-edit'
import selectStyles from '../../../styles/select-styles'
import { BasePropertyProps } from '../base-property-props'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import { SearchRecord } from '../../../../backend/controllers/api-controller'

export default class Edit extends React.Component<BasePropertyProps> {
  private selected: RecordJSON

  constructor(props) {
    super(props)
    this.loadOptions = this.loadOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected): void {
    const { onChange, property } = this.props
    this.selected = selected.record
    onChange(property.name, selected.value, selected.record)
  }

  async loadOptions(inputValue): Promise<Array<{
    value: string;
    label: string;
    record: SearchRecord;
    }>> {
    const { property } = this.props
    const api = new ApiClient()

    const records = await api.searchRecords({
      resourceId: property.reference,
      query: inputValue,
    })
    return records.map(record => ({ value: record.id, label: record.title, record }))
  }

  render(): ReactNode {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]

    const reference = record.populated && record.populated[property.name]
    let selectedOption = reference && {
      value: reference.id,
      label: reference.title,
    }

    if (this.selected) {
      selectedOption = {
        value: this.selected.id,
        label: this.selected.title,
      }
    }

    return (
      <PropertyInEdit property={property} error={error}>
        <Select
          cacheOptions
          value={selectedOption}
          styles={selectStyles}
          defaultOptions
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
        />
      </PropertyInEdit>
    )
  }
}
