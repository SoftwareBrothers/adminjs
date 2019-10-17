import React, { ReactNode } from 'react'
import Select from 'react-select/lib/Async'
import { ThemeProps, DefaultTheme, withTheme } from 'styled-components'
import ApiClient from '../../../utils/api-client'

import PropertyInFilter from '../../ui/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'
import { FilterPropertyProps } from '../base-property-props'

class Filter extends React.PureComponent<FilterPropertyProps & ThemeProps<DefaultTheme>> {
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
    const { property, filter, theme } = this.props
    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name]
    const selected = (this.options || []).find(o => o.value === value)
    return (
      <PropertyInFilter property={property}>
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          cacheOptions
          styles={filterStyles(theme)}
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
          defaultOptions
        />
      </PropertyInFilter>
    )
  }
}

export default withTheme(Filter)
