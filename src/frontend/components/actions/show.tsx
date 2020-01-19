import React from 'react'

import PropertyType from '../property-type'
import { ActionProps } from './action.props'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'

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
    <React.Fragment>
      {properties.map(property => (
        <PropertyType
          key={property.name}
          where={PropertyPlace.show}
          property={property}
          resource={resource}
          record={record}
        />
      ))}
    </React.Fragment>
  )
}

export default Show
