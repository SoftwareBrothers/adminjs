import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import StyledButton from '../ui/styled-button'
import PropertyType from '../property-type'
import { locationType, historyType, resourceType, matchType } from '../../types'

const FilterWrapper = styled.section`
  background: ${({ theme }) => theme.colors.darkBck};
  flex-shrink: 0;
  width: ${({ theme }) => theme.sizes.sidebarWidth};
  color: #fff;
  padding-top: 60px;
  transition: width 0.5s;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  &.filter-hidden {
    width: 0;
    transition: width 0.5s;
  }
`

const FilterLink = styled.a`
  color: #fff;
  & > span {
    opacity: 0.25;
    color: ${({ theme }) => theme.colors.lightText};
    border: 1px solid ${({ theme }) => theme.colors.lightText};
    border-radius: 3px;
    padding: 8px 10px;
    margin-right: ${({ theme }) => theme.sizes.padding};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    & span{
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      opacity: 1;
    }
  }
`

const FilterContent = styled.section`
  padding: ${({ theme }) => theme.sizes.paddingLayout};
  width: ${({ theme }) => theme.sizes.sidebarWidth};
  overflow: hidden;

  & a, & button {
    margin: ${({ theme }) => theme.sizes.paddingMin} 0;
    width: 100%;
  }
`

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.state = {
      filter: this.parseQuery(),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props
    if (nextProps.match.params.resourceId !== match.params.resourceId) {
      this.setState({ filter: {} })
    }
  }

  parseQuery() {
    const { location } = this.props
    const filter = {}
    const query = new URLSearchParams(location.search)
    for (const entry of query.entries()) {
      const [key, value] = entry
      if (key.match('filters.')) {
        filter[key.replace('filters.', '')] = value
      }
    }
    return filter
  }

  handleSubmit(event) {
    event.preventDefault()
    const { filter } = this.state
    const { history } = this.props
    const search = new URLSearchParams(window.location.search)
    Object.keys(filter).forEach((key) => {
      if (filter[key] !== '') {
        search.set(`filters.${key}`, filter[key])
      } else {
        search.delete(`filters.${key}`)
      }
    })
    search.set('page', 1)
    history.push(`${history.location.pathname}?${search.toString()}`)
    return false
  }

  resetFilter(event) {
    const { history } = this.props
    event.preventDefault()
    const filteredSearch = new URLSearchParams()
    const search = new URLSearchParams(window.location.search)
    for (const key of search.keys()) {
      if (!key.match('filters.')) {
        filteredSearch.set(key, search.get(key))
      }
    }
    const query = filteredSearch.toString() === '' ? `?${filteredSearch.toString()}` : ''
    history.push(history.location.pathname + query)
    this.setState({ filter: {} })
  }

  handleChange(propertyName, value) {
    this.setState(state => ({
      filter: {
        ...state.filter,
        [propertyName]: value,
      },
    }))
  }

  render() {
    const { resource, isVisible, toggleFilter } = this.props
    const { filter } = this.state
    const properties = resource.filterProperties
    return (
      <FilterWrapper className={isVisible ? null : 'filter-hidden'}>
        <FilterContent>
          <FilterLink onClick={toggleFilter}>
            <span><i className="fas fa-arrow-right" /></span>
            Filter
          </FilterLink>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {properties.map(property => (
              <PropertyType
                key={property.name}
                where="filter"
                onChange={this.handleChange}
                property={property}
                filter={filter}
                resource={resource}
              />
            ))}
            <StyledButton as="button" className="is-primary">
              Apply Changes
            </StyledButton>
            <StyledButton
              as="a"
              className="is-text"
              onClick={this.resetFilter}
            >
              Clear filters
            </StyledButton>
          </form>
        </FilterContent>
      </FilterWrapper>
    )
  }
}

Filter.propTypes = {
  location: locationType.isRequired,
  history: historyType.isRequired,
  resource: resourceType.isRequired,
  isVisible: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  match: matchType.isRequired,
}

export default withRouter(Filter)
