import React from 'react'
import PropertyInFilter from '../../layout/property-in-filter'

export default class Filter extends React.PureComponent {
  handleChange(event) {
    this.props.onChange(this.props.property.name, event.target.value)
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
