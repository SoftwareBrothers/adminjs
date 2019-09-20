import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'

import { propertyType, locationType } from '../../types'

const Th = styled.th`
  &&& {
    font-size: ${({ theme }) => theme.fonts.min};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.lightText};
    font-weight: normal;
    padding: ${({ theme }) => theme.sizes.padding};
    letter-spacing: 0.1em;
    border: none;
  }
`

const StyledLink = styled(NavLink).attrs({
  className: 'is-sortable text-small',
})`
  color: ${({ theme }) => theme.colors.lightText};

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  & > i {
    margin-left: ${({ theme }) => theme.sizes.padding}
  }
`

class SortLink extends React.PureComponent {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  isActive() {
    const { sortBy, property } = this.props
    return sortBy === property.name
  }

  render() {
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

const PropertyHeader = (props) => {
  const { property, titleProperty } = props

  const isMain = property.name === titleProperty.name

  return (
    <Th className={isMain ? 'main' : null}>
      {property.isSortable ? <SortLink {...props} /> : property.label}
    </Th>
  )
}

SortLink.propTypes = {
  property: propertyType.isRequired,
  location: locationType.isRequired,
  direction: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
}

PropertyHeader.propTypes = {
  property: propertyType.isRequired,
  /**
   * Property which should be treated as main property.
   */
  titleProperty: propertyType.isRequired,
  /**
   * currently selected direction. Either 'asc' or 'desc'.
   */
  direction: PropTypes.string.isRequired,
  /**
   * currently selected field by which list is sorted.
   */
  sortBy: PropTypes.string.isRequired,
}

export default withRouter(PropertyHeader)
