import { DrawerContent } from '@adminjs/design-system'
import React from 'react'

import allowOverride from '../../hoc/allow-override'
import { getActionElementCss } from '../../utils'
import ActionHeader from '../app/action-header/action-header'
import PropertyType from '../property-type'
import { ActionProps } from './action.props'
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

  const contentTag = getActionElementCss(resource.id, action.name, 'drawer-content')

  return (
    <DrawerContent data-css={contentTag}>
      {action?.showInDrawer ? <ActionHeader {...props} /> : null}
      {action.layout ? action.layout.map((layoutElement, i) => (
        <LayoutElementRenderer
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          layoutElement={layoutElement}
          {...props}
          where="show"
        />
      )) : properties.map((property) => (
        <PropertyType
          key={property.propertyPath}
          where="show"
          property={property}
          resource={resource}
          record={record}
        />
      ))}

    </DrawerContent>
  )
}

const OverridableShow = allowOverride(Show, 'DefaultShowAction')

export {
  OverridableShow as default,
  OverridableShow as Show,
}
