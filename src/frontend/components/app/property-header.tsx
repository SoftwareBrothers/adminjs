import React from 'react'
import styled from 'styled-components'

import PropertyJSON from '../../../backend/decorators/property-json.interface'
import SortLink from './sort-link'

const Th = styled.th`
  &&& {
    font-size: ${({ theme }): string => theme.fonts.min};
    text-transform: uppercase;
    color: ${({ theme }): string => theme.colors.lightText};
    font-weight: normal;
    padding: ${({ theme }): string => theme.sizes.padding};
    letter-spacing: 0.1em;
    border: none;
  }
`

type Props = {
  property: PropertyJSON;
  /**
   * Property which should be treated as main property.
   */
  titleProperty: PropertyJSON;
  /**
   * currently selected direction. Either 'asc' or 'desc'.
   */
  direction?: 'asc' | 'desc';
  /**
   * currently selected field by which list is sorted.
   */
  sortBy?: string;
}

const PropertyHeader: React.FC<Props> = (props) => {
  const { property, titleProperty } = props

  const isMain = property.name === titleProperty.name

  return (
    <Th className={isMain ? 'main' : undefined}>
      {property.isSortable ? <SortLink {...props} /> : property.label}
    </Th>
  )
}

export default PropertyHeader
