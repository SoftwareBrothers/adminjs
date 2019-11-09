import React, { ReactNode, MouseEvent, SyntheticEvent } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { RouteComponentProps } from 'react-router'
import StyledButton from '../ui/styled-button'
import PropertyType from '../property-type'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

const FilterWrapper = styled.section`
  background: ${({ theme }): string => theme.colors.darkBck};
  flex-shrink: 0;
  width: ${({ theme }): string => theme.sizes.sidebarWidth};
  border-left: 1px solid ${({ theme }): string => theme.colors.borderOnDark};
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
    color: ${({ theme }): string => theme.colors.lightText};
    border: 1px solid ${({ theme }): string => theme.colors.lightText};
    border-radius: 3px;
    padding: 8px 10px;
    margin-right: ${({ theme }): string => theme.sizes.padding};
  }
  &:hover {
    color: ${({ theme }): string => theme.colors.primary};
    & span{
      color: ${({ theme }): string => theme.colors.primary};
      border-color: ${({ theme }): string => theme.colors.primary};
      opacity: 1;
    }
  }
`

const FilterContent = styled.section`
  padding: ${({ theme }): string => theme.sizes.paddingLayout};
  width: ${({ theme }): string => theme.sizes.sidebarWidth};
  min-width: ${({ theme }): string => theme.sizes.sidebarWidth};
  overflow: hidden;
  min-height: 100%;

  & a, & button {
    margin: ${({ theme }): string => theme.sizes.paddingMin} 0;
    width: 100%;
  }
`

type Props = {
  resource: ResourceJSON;
  toggleFilter: () => void;
  isVisible: boolean;
}

type State = {
  filter: any;
}

type MatchProps = {
  resourceId: string;
}

type CombinedProps = Props & RouteComponentProps<MatchProps>

class Filter extends React.Component<CombinedProps, State> {
  constructor(props: CombinedProps) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.state = {
      filter: this.parseQuery(),
    }
  }

  componentWillReceiveProps(nextProps: CombinedProps): void {
    const { match } = this.props
    if (nextProps.match.params.resourceId !== match.params.resourceId) {
      this.setState({ filter: {} })
    }
  }

  parseQuery(): any {
    const { location } = this.props
    const filter: Record<string, string> = {}
    const query = new URLSearchParams(location.search)
    for (const entry of query.entries()) {
      const [key, value] = entry
      if (key.match('filters.')) {
        filter[key.replace('filters.', '')] = value
      }
    }
    return filter
  }

  handleSubmit(event: SyntheticEvent): false {
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
    search.set('page', '1')
    history.push(`${history.location.pathname}?${search.toString()}`)
    return false
  }

  resetFilter(event: MouseEvent): void {
    const { history } = this.props
    event.preventDefault()
    const filteredSearch = new URLSearchParams()
    const search = new URLSearchParams(window.location.search)
    for (const key of search.keys()) {
      if (!key.match('filters.')) {
        filteredSearch.set(key, search.get(key) as string)
      }
    }
    const query = filteredSearch.toString() === '' ? `?${filteredSearch.toString()}` : ''
    history.push(history.location.pathname + query)
    this.setState({ filter: {} })
  }

  handleChange(propertyName: string | RecordJSON, value: any): void {
    if ((propertyName as RecordJSON).params) {
      throw new Error('you can not pass RecordJSON to filters')
    }
    this.setState(state => ({
      filter: {
        ...state.filter,
        [propertyName as string]: value,
      },
    }))
  }

  render(): ReactNode {
    const { resource, isVisible, toggleFilter } = this.props
    const { filter } = this.state
    const properties = resource.filterProperties
    return (
      <FilterWrapper className={isVisible ? undefined : 'filter-hidden'}>
        <FilterContent>
          <FilterLink onClick={toggleFilter}>
            <span><i className="fas fa-arrow-right" /></span>
            Filter
          </FilterLink>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {properties.map(property => (
              <PropertyType
                key={property.name}
                where={PropertyPlace.filter}
                onChange={this.handleChange}
                property={property}
                filter={filter}
                resource={resource}
              />
            ))}
            <StyledButton className="is-primary">
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

export default withRouter(Filter)
