import React, { ReactNode } from 'react'
import Select from 'react-select/lib/Async'
import ApiClient from '../../../utils/api-client'

import PropertyInFilter from '../../ui/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'
import { BasePropertyProps } from '../base-property-props'

export default class Filter extends React.PureComponent<BasePropertyProps> {
  private api: ApiClient

  private options: Array<{value: string; label: string}>

  constructor(props) {
    super(props)
    this.loadOptions = this.loadOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected): void {
    const { onChange, property } = this.props
    onChange(property.name, selected ? selected.value : '')
  }

  async loadOptions(inputValue): Promise<Array<{value: string; label: string }>> {
    this.api = new ApiClient()
    const { property } = this.props
    const records = await this.api.searchRecords({
      resourceId: property.reference,
      query: inputValue,
    })
    this.options = records.map(r => ({ value: r.id, label: r.title }))
    return this.options
  }

  render(): ReactNode {
    const { property, filter } = this.props
    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name]
    const selected = (this.options || []).find(o => o.value === value)
    return (
      <PropertyInFilter property={property}>
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          cacheOptions
          styles={filterStyles}
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
          defaultOptions
        />
      </PropertyInFilter>
    )
  }
}
