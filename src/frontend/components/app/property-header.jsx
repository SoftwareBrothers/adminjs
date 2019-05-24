import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'

import { propertyType, resourceType, locationType } from '../../types'
import { sizes, fonts, colors } from '../../styles/variables'

const Th = styled.th`
  &&& {
    font-size: ${fonts.min};
    text-transform: uppercase;
    color: ${colors.lightText};
    font-weight: normal;
    padding: ${sizes.padding};
    letter-spacing: 0.1em;
    border: none;

    &.main {
      width: ${sizes.mainColumn};
      left: 0;
      position: absolute;
      top: auto;
      white-space: nowrap;
    }
  }
`

const StyledLink = styled(NavLink).attrs({
  className: 'is-sortable text-small',
})`
  color: ${colors.lightText};

  &.active {
    color: ${colors.primary};
  }

  & > i {
    margin-left: ${sizes.padding}
  }
`

const isSortedBy = ({ location, property, resource }) => {
  const query = new URLSearchParams(location.search)
  const sortBy = query.get('sortBy')
  return (sortBy && sortBy === property.name)
      || (!sortBy && property.name === resource.titleProperty.name)
}

const SortIndicator = ({ sortedBy, location }) => {
  const query = new URLSearchParams(location.search)

  if (sortedBy) {
    const direction = query.get('direction') || 'asc'
    const sortedByClass = `icomoon-dropdown-${direction === 'asc' ? 'open' : 'close'}`
    return (
      <i className={sortedByClass} />
    )
  }
  return null
}

class SortLink extends React.PureComponent {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  isActive() {
    return isSortedBy(this.props)
  }

  render() {
    const { property, resource, location } = this.props
    const query = new URLSearchParams(location.search)
    const opositeDirection = query.get('direction') === 'asc' ? 'desc' : 'asc'
    const sortedBy = isSortedBy({ property, resource, location })
    const direction = sortedBy ? opositeDirection : 'asc'
    query.set('direction', direction)
    query.set('sortBy', property.name)
    return (
      <StyledLink
        to={{ search: query.toString() }}
        isActive={this.isActive}
      >
        {property.label}
        {SortIndicator({ sortedBy, location })}
      </StyledLink>
    )
  }
}

const PropertyHeader = (props) => {
  const { property, resource } = props

  const isMain = property.name === resource.titleProperty.name

  return (
    <Th className={isMain ? 'main' : null}>
      {property.isSortable ? <SortLink {...props} /> : property.label}
    </Th>
  )
}

SortLink.propTypes = {
  property: propertyType.isRequired,
  resource: resourceType.isRequired,
  location: locationType.isRequired,
}

SortIndicator.propTypes = {
  location: locationType.isRequired,
  sortedBy: PropTypes.bool.isRequired,
}
PropertyHeader.propTypes = {
  property: propertyType.isRequired,
  resource: resourceType.isRequired,
}

export default withRouter(PropertyHeader)
