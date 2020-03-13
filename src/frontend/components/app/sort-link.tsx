import React, { ReactNode } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import PropertyJSON from '../../../backend/decorators/property-json.interface'
import { Icon } from '../design-system'
import { cssClass } from '../design-system/utils/css-class'

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
    const oppositeDirection = (this.isActive() && direction === 'asc') ? 'desc' : 'asc'
    const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`

    query.set('direction', oppositeDirection)
    query.set('sortBy', property.name)

    return (
      <NavLink to={{ search: query.toString() }} className={cssClass('SortLink')}>
        {property.label}
        {this.isActive() ? (<Icon icon={sortedByIcon} color="primary100" ml="default" />) : ''}
      </NavLink>
    )
  }
}

export default withRouter(SortLink)
