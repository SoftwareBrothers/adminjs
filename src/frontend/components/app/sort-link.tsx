import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import PropertyJSON from '../../../backend/decorators/property-json.interface'

const StyledLink = styled(NavLink).attrs({
  className: 'is-sortable text-small',
})`
  color: ${({ theme }): string => theme.colors.lightText};

  &.active {
    color: ${({ theme }): string => theme.colors.primary};
  }

  & > i {
    margin-left: ${({ theme }): string => theme.sizes.padding}
  }
`

type Props = {
  property: PropertyJSON;
  direction?: 'asc' | 'desc';
  sortBy?: string;
}

class SortLink extends React.PureComponent<Props & RouteComponentProps> {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  isActive(): boolean {
    const { sortBy, property } = this.props
    return sortBy === property.name
  }

  render(): ReactNode {
    const { property, location, direction } = this.props
    const query = new URLSearchParams(location.search)
    const opositeDirection = (this.isActive() && direction === 'asc') ? 'desc' : 'asc'
    const sortedByClass = `icomoon-dropdown-${direction === 'asc' ? 'open' : 'close'}`

    query.set('direction', opositeDirection)
    query.set('sortBy', property.name)

    return (
      <StyledLink to={{ search: query.toString() }} isActive={this.isActive}>
        {property.label}
        {this.isActive() ? (<i className={sortedByClass} />) : ''}
      </StyledLink>
    )
  }
}

export default withRouter(SortLink)
