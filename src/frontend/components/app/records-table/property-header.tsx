import React from 'react'
import { TableCell } from '@admin-bro/design-system'

import PropertyJSON from '../../../interfaces/property-json.interface'
import SortLink from '../sort-link'

export type PropertyHeaderProps = {
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

  display?: string | Array<string>;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = (props) => {
  const { property, titleProperty, display } = props

  const isMain = property.name === titleProperty.name

  return (
    <TableCell
      className={isMain ? 'main' : undefined}
      display={display}
    >
      {property.isSortable ? <SortLink {...props} /> : property.label}
    </TableCell>
  )
}

export default PropertyHeader
