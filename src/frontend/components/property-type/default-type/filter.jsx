import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import PropertyInFilter from '../../ui/property-in-filter'
import { filterStyles } from '../../../styles/select-styles'
import { propertyType } from '../../../types'

export default class Filter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleInputChange(event) {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  handleSelectChange(selected) {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  renderInput() {
    const { property, filter } = this.props
    const filterKey = `filter-${property.name}`
    const value = filter[property.name] || ''
    if (property.availableValues) {
      const selected = property.availableValues.find(av => av.value === value)
      return (
        <Select
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          options={property.availableValues}
          styles={filterStyles}
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

  render() {
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

Filter.propTypes = {
  property: propertyType.isRequired,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  filter: PropTypes.object,
}

Filter.defaultProps = {
  filter: {},
}
