import React, { ReactNode } from 'react'
import Select from 'react-select'
import { withTheme, DefaultTheme, ThemeProps } from 'styled-components'
import { FormGroup, Label, filterStyles } from '@admin-bro/design-system'

import mapValue from './map-value'
import { FilterPropertyProps } from '../base-property-props'

class Filter extends React.PureComponent<FilterPropertyProps & ThemeProps<DefaultTheme>> {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected): void {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  render(): ReactNode {
    const { property, filter = {}, theme } = this.props
    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name]
    const options = [
      { value: true, label: mapValue(true) },
      { value: false, label: mapValue(false) },
    ]
    const selected = options.find(o => o.value === value)
    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={options}
          styles={filterStyles(theme)}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
  }
}

export default withTheme(Filter as never)
