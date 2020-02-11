import React, { ReactNode } from 'react'
import Select from 'react-select/lib/Async'
import { withTheme, DefaultTheme } from 'styled-components'

import ApiClient from '../../../utils/api-client'
import selectStyles from '../../../styles/select-styles'
import { EditPropertyProps, SelectRecord } from '../base-property-props'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import { FormGroup, Label, FormMessage } from '../../design-system'

type CombinedProps = EditPropertyProps & {theme: DefaultTheme}
type SelectRecordEnhanced = SelectRecord & {
  record: RecordJSON;
}

class Edit extends React.Component<CombinedProps> {
  private selected: RecordJSON | null

  constructor(props: CombinedProps) {
    super(props)
    this.selected = null
    this.loadOptions = this.loadOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected: SelectRecordEnhanced): void {
    const { onChange, property } = this.props
    if (selected) {
      this.selected = selected.record
      onChange(property.name, selected.value, selected.record)
    } else {
      onChange(property.name, '')
    }
  }

  async loadOptions(inputValue: string): Promise<Array<SelectRecordEnhanced>> {
    const { property } = this.props
    const api = new ApiClient()

    const records = await api.searchRecords({
      resourceId: property.reference as string,
      query: inputValue,
    })
    return records.map((record: RecordJSON) => ({
      value: record.id,
      label: record.title,
      record,
    }))
  }

  render(): ReactNode {
    const { property, record, theme } = this.props
    const error = record.errors && record.errors[property.name]

    const reference = record.populated && record.populated[property.name]
    let selectedOption = reference ? {
      value: reference.id,
      label: reference.title,
    } : {
      value: '',
      label: '',
    }
    const styles = selectStyles(theme)

    if (this.selected && record.params[property.name]) {
      selectedOption = {
        value: this.selected.id,
        label: this.selected.title,
      }
    }

    return (
      <FormGroup error={!!error}>
        <Label htmlFor={property.name}>{property.label}</Label>
        <Select
          cacheOptions
          value={selectedOption}
          styles={styles}
          defaultOptions
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
          isDisabled={property.isDisabled}
        />
        <FormMessage>{error && error.message}</FormMessage>
      </FormGroup>
    )
  }
}

export default withTheme(Edit)
