import React from 'react'
import PropTypes from 'prop-types'

import PropertyInFilter from '../../layout/property-in-filter'
import { propertyType } from '../../../types'

export default class Filter extends React.PureComponent {
  handleChange(event) {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  render() {
    const { property, filter } = this.props
    const filterKey = `filter-${property.name}`
    const value = filter[property.name] || ''
    return (
      <PropertyInFilter property={property}>
        <div className="control has-icons-left">
          <span className="icon is-small is-right">
            <i className="fas fa-search" />
          </span>
          <input
            type="text"
            className="input filter"
            name={filterKey}
            onChange={this.handleChange.bind(this)}
            value={value}
          />
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
