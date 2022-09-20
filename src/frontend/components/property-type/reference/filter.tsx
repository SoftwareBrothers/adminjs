import React, { ReactNode } from 'react'
import { FormGroup, Label, SelectAsync } from '@adminjs/design-system'

import ApiClient from '../../../utils/api-client'
import { FilterPropertyProps, SelectRecord } from '../base-property-props'

type CombinedProps = FilterPropertyProps
type FilterState = {
  options: Array<SelectRecord>
}

class Filter extends React.PureComponent<CombinedProps, FilterState> {
  private api: ApiClient

  constructor(props: CombinedProps) {
    super(props)
    this.api = new ApiClient()
    this.loadOptions = this.loadOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      options: [],
    }
  }

  handleChange(selected: SelectRecord): void {
    const { onChange, property } = this.props
    onChange(property.path, selected ? selected.value : '')
  }

  async loadOptions(inputValue: string): Promise<Array<{value: string | number; label: string }>> {
    const { property } = this.props
    const records = await this.api.searchRecords({
      resourceId: property.reference as string,
      query: inputValue,
    })
    const options = records.map((r) => ({ value: r.id, label: r.title }))
    this.setState({
      options,
    })
    return options
  }

  render(): ReactNode {
    const { property, filter } = this.props
    const { options } = this.state
    const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path]
    const selected = (options || []).find((o) => String(o.value) === String(value))
    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <SelectAsync
          variant="filter"
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          cacheOptions
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
          defaultOptions
        />
      </FormGroup>
    )
  }
}

export default Filter
