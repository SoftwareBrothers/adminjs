import React, { ReactNode } from 'react'
import Select from 'react-select/lib/Async'
import { ThemeProps, DefaultTheme, withTheme } from 'styled-components'
import { FormGroup, Label, filterStyles } from '@admin-bro/design-system'

import ApiClient from '../../../utils/api-client'
import { FilterPropertyProps, SelectRecord } from '../base-property-props'

type CombinedProps = FilterPropertyProps & ThemeProps<DefaultTheme>

class Filter extends React.PureComponent<CombinedProps> {
  private api: ApiClient

  private options: Array<SelectRecord>

  constructor(props: CombinedProps) {
    super(props)
    this.api = new ApiClient()
    this.options = []
    this.loadOptions = this.loadOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected: SelectRecord): void {
    const { onChange, property } = this.props
    onChange(property.name, selected ? selected.value : '')
  }

  async loadOptions(inputValue: string): Promise<Array<{value: string; label: string }>> {
    const { property } = this.props
    const records = await this.api.searchRecords({
      resourceId: property.reference as string,
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
      <FormGroup>
        <Label>{property.label}</Label>
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          cacheOptions
          styles={filterStyles(theme)}
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
          defaultOptions
        />
      </FormGroup>
    )
  }
}

export default withTheme(Filter)
