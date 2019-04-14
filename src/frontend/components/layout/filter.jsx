import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import { sizes, colors } from '../../styles/variables'
import StyledBtn from './styled-btn'
import PropertyType from '../property-type'

const FilterWrapper = styled.section`
  background: ${colors.darkBck};
  flex-shrink: 0;
  width: ${sizes.sidebarWidth};
  color: #fff;
  padding-top: 60px;
  transition: width 0.5s;
  overflow-x: hidden;
  &.filter-hidden {
    width: 0;
    transition: width 0.5s;
  }
`

const FilterLink = styled.a`
  color: #fff;
  & > span {
    opacity: 0.25;
    color: ${colors.lightText};
    border: 1px solid ${colors.lightText};
    border-radius: 3px;
    padding: 8px 10px;
    margin-right: ${sizes.padding};
  }
  &:hover {
    color: ${colors.primary};
    & span{
      color: ${colors.primary};
      border-color: ${colors.primary};
      opacity: 1;
    }
  }
`

const FilterContent = styled.section`
  padding: ${sizes.paddingLayout};
  width: ${sizes.sidebarWidth};
  overflow: hidden;

  & ${StyledBtn} {
    margin: ${sizes.paddingMin} 0;
    width: 100%;
  }
`

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
    const { resource, isVisible, toggleFilter } = this.props
    const properties = resource.editProperties
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
                onChange={this.handleChange.bind(this)}
                property={property}
                filter={this.state.filter}
                resource={resource} />
            ))}
            <StyledBtn as="button" className="is-primary">
              Apply Changes
            </StyledBtn>
            <StyledBtn
              as="a"
              className="is-text"
              onClick={this.resetFilter.bind(this)}
            >
              Clear filters
            </StyledBtn>
          </form>
        </FilterContent>
      </FilterWrapper>
    )
  }
}

export default withRouter(Filter)
