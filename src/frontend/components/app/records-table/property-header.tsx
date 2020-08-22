import React from 'react'
import { TableCell } from '@admin-bro/design-system'

import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import SortLink from '../sort-link'

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

  display?: string | Array<string>;
}

const PropertyHeader: React.FC<Props> = (props) => {
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
