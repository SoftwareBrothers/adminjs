import React, { ReactNode } from 'react'
import Select from 'react-select'

import { withTheme, ThemeProps, DefaultTheme } from 'styled-components'
import PropertyInFilter from '../../ui/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'
import { FilterPropertyProps } from '../base-property-props'

class Filter extends React.PureComponent<FilterPropertyProps & ThemeProps<DefaultTheme>> {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleInputChange(event): void {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  handleSelectChange(selected): void {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  renderInput(): ReactNode {
    const { property, filter, theme } = this.props
    const filterKey = `filter-${property.name}`
    const value = filter[property.name] || ''
    if (property.availableValues) {
      const selected = property.availableValues.find(av => av.value === value)
      return (
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={property.availableValues}
          styles={filterStyles(theme)}
          onChange={this.handleSelectChange}
        />
      )
    }
    return (
      <React.Fragment>
        <span className="icon is-small is-right">
          <i className="fas fa-search" />
        </span>
        <input
          type="text"
          className="input filter"
          name={filterKey}
          onChange={this.handleInputChange}
          value={value}
        />
      </React.Fragment>
    )
  }

  render(): ReactNode {
    const { property } = this.props
    return (
      <PropertyInFilter property={property}>
        <div className="control has-icons-left">
          {this.renderInput()}
        </div>
      </PropertyInFilter>
    )
  }
}
export default withTheme(Filter)
