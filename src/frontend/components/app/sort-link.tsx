import React, { memo, useMemo } from 'react'
import { useLocation, NavLink } from 'react-router-dom'

import { Icon, cssClass } from '@adminjs/design-system'

import { BasePropertyJSON } from '../../interfaces'

export type SortLinkProps = {
  property: BasePropertyJSON;
  direction?: 'asc' | 'desc';
  sortBy?: string;
}

const SortLink: React.FC<SortLinkProps> = (props) => {
  const { sortBy, property, direction } = props
  const location = useLocation()

  const isActive = useMemo(() => sortBy === property.propertyPath, [sortBy, property])

  const query = new URLSearchParams(location.search)
  const oppositeDirection = (isActive && direction === 'asc') ? 'desc' : 'asc'
  const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`

  query.set('direction', oppositeDirection)
  query.set('sortBy', property.propertyPath)

  return (
    <NavLink to={{ search: query.toString() }} className={cssClass('SortLink')}>
      {property.label}
      {isActive ? (<Icon icon={sortedByIcon} color="primary100" ml="default" />) : ''}
    </NavLink>
  )
}

const checkSortProps = (
  prevProps: Readonly<SortLinkProps>,
  nextProps: Readonly<SortLinkProps>,
) => (prevProps.direction === nextProps.direction
  && prevProps.property.propertyPath === nextProps.property.propertyPath
  && prevProps.sortBy === nextProps.sortBy)

export default memo(SortLink, checkSortProps)
