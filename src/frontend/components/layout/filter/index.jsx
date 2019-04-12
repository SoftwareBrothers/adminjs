import React from 'react'
import { withRouter } from 'react-router-dom'

import PropertyType from '../../property-type'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: this.parseQuery(),
    }
  }

  parseQuery() {
    const filter = {}
    const query = new URLSearchParams(this.props.location.search)
    for (var entry of query.entries()) {
      if (entry[0].match('filters.')){
        filter[entry[0].replace('filters.', '')] = entry[1]
      }
    }
    return filter
  }

  handleSubmit(event) {
    event.preventDefault()
    const search = new URLSearchParams(window.location.search)
    Object.keys(this.state.filter).forEach(key => {
      if (this.state.filter[key] !== '') {
        search.set(`filters.${key}`, this.state.filter[key])
      } else {
        search.delete(`filters.${key}`)
      }
    })
    this.props.history.push(this.props.history.location.pathname + '?' + search.toString())
    return false
  }

  resetFilter(event) {
    event.preventDefault()
    const filteredSearch = new URLSearchParams()
    const search = new URLSearchParams(window.location.search)
    for (let key of search.keys()) {
      if (!key.match('filters.')){
        filteredSearch.set(key, search.get(key))
      }
    }
    const query = filteredSearch.toString() === '' ? '?' + filteredSearch.toString() : ''
    this.props.history.push(this.props.history.location.pathname + query)
    this.setState({filter: {}})
  }

  handleChange(propertyName, value) {
    const filter = {
      ...this.state.filter,
      [propertyName]: value,
    }
    this.setState({
      filter
    })
  }

  render() {
    const { resource } = this.props
    const properties = resource.editProperties
    return (
      <div className="filters-bar-wrapper">
        <div className={`filters-bar${this.props.isVisible ? ' filters-show' : ''}`}>
          <a className="filters-close" onClick={this.props.toggleFilter}>
            <span className="arrow-right"><i className="fas fa-arrow-right"></i></span>
            <span>Filter</span>
          </a>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {properties.map(property => (
              <PropertyType
                key={property.name}
                where="filter"
                onChange={this.handleChange.bind(this)}
                property={property}
                filter={this.state.filter}
                resource={resource} />
            ))}
            <button className="button is-primary apply-changes">Apply Changes</button>
            <a href="#" className="clear-button" onClick={this.resetFilter.bind(this)}>
              <span className="clear">Clear filters</span>
            </a>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Filter)
