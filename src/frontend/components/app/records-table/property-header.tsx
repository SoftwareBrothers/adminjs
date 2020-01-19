import React from 'react'

import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import SortLink from '../sort-link'
import { TableCell } from '../../design-system'

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
    <TableCell className={isMain ? 'main' : undefined}>
      {property.isSortable ? <SortLink {...props} /> : property.label}
    </TableCell>
  )
}

export default PropertyHeader
