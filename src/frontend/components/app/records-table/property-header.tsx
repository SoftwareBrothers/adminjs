import React from 'react'
import { TableCell } from '@adminjs/design-system'

import { BasePropertyJSON } from '../../../interfaces/index.js'
import SortLink from '../sort-link.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'

export type PropertyHeaderProps = {
  property: BasePropertyJSON;
  /**
   * Property which should be treated as main property.
   */
  titleProperty: BasePropertyJSON;
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

const PropertyHeader: React.FC<PropertyHeaderProps> = (props) => {
  const { property, titleProperty, display } = props
  const { translateProperty } = useTranslation()

  const isMain = property.propertyPath === titleProperty.propertyPath

  return (
    <TableCell
      className={isMain ? 'main' : undefined}
      display={display}
    >
      {property.isSortable ? <SortLink {...props} />
        : translateProperty(property.label, property.resourceId)}
    </TableCell>
  )
}

const OverridablePropertyHeader = allowOverride(PropertyHeader, 'PropertyHeader')

export {
  OverridablePropertyHeader as default,
  OverridablePropertyHeader as PropertyHeader,
  PropertyHeader as OriginalPropertyHeader,
}
