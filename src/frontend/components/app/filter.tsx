import React, { ReactNode, MouseEvent, SyntheticEvent } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import PropertyType from '../property-type'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { Box, H3, Button, Icon, Drawer, DrawerContent, DrawerFooter } from '../design-system'

type FilterProps = {
  isHidden?: boolean;
}

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

class FilterContainer extends React.Component<CombinedProps, State> {
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
      <Drawer variant="filter" isHidden={!isVisible} as="form" onSubmit={this.handleSubmit}>
        <DrawerContent>
          <H3>
            <Button
              type="button"
              size="icon"
              rounded
              mr="lg"
              onClick={(): void => toggleFilter()}
            >
              <Icon icon="ChevronRight" color="white" />
            </Button>
            Filters
          </H3>
          <Box my="x3">
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
          </Box>
        </DrawerContent>
        <DrawerFooter>
          <Button variant="primary" size="lg">
            Apply changes
          </Button>
          <Button variant="text" size="lg" onClick={this.resetFilter} type="button">
            Reset filter
          </Button>
        </DrawerFooter>
      </Drawer>
    )
  }
}

// <FilterContent>
//   <FilterLink onClick={toggleFilter}>
//     <span><i className="fas fa-arrow-right" /></span>
//     Filter
//   </FilterLink>
// <form onSubmit={this.handleSubmit.bind(this)}>
//   {properties.map(property => (
//     <PropertyType
//       key={property.name}
//       where={PropertyPlace.filter}
//       onChange={this.handleChange}
//       property={property}
//       filter={filter}
//       resource={resource}
//     />
//   ))}
//   <StyledButton className="is-primary">
//     Apply Changes
//   </StyledButton>
//   <StyledButton
//     as="a"
//     className="is-text"
//     onClick={this.resetFilter}
//   >
//     Clear filters
//   </StyledButton>
// </form>
// </FilterContent>

export default withRouter(FilterContainer)
