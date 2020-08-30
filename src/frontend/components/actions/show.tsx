import React from 'react'
import { DrawerContent } from '@admin-bro/design-system'

import PropertyType from '../property-type'
import { ActionProps } from './action.props'
import ActionHeader from '../app/action-header'
import LayoutElementRenderer from './utils/layout-element-renderer'

/**
 * @name ShowAction
 * @category Actions
 * @description Shows a given record.
 * @component
 * @private
 */
const Show: React.FC<ActionProps> = (props) => {
  const { resource, record, action } = props
  const properties = resource.showProperties

  return (
    <DrawerContent>
      {action?.showInDrawer ? <ActionHeader {...props} /> : null}
      {action.layout ? action.layout.map((layoutElement, i) => (
        <LayoutElementRenderer
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          layoutElement={layoutElement}
          {...props}
          where="show"
        />
      )) : properties.map(property => (
        <PropertyType
          key={property.name}
          where="show"
          property={property}
          resource={resource}
          record={record}
        />
      ))}

    </DrawerContent>
  )
}

export default Show
