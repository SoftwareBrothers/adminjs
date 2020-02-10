import React from 'react'

import PropertyType from '../property-type'
import { ActionProps } from './action.props'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import { DrawerContent } from '../design-system'
import ActionHeader from '../app/action-header'

/**
 * @name ShowAction
 * @category Actions
 * @description Shows a given record.
 * @component
 * @private
 */
const Show: React.FC<ActionProps> = (props) => {
  const { resource, record } = props
  const properties = resource.showProperties

  return (
    <DrawerContent>
      <ActionHeader {...props} />
      {properties.map(property => (
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
