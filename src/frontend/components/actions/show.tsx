import React from 'react'

import PropertyType from '../property-type'
import WrapperBox from '../ui/wrapper-box'
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
    <WrapperBox border>
      {properties.map(property => (
        <PropertyType
          key={property.name}
          where={PropertyPlace.show}
          property={property}
          resource={resource}
          record={record}
        />
      ))}
    </WrapperBox>
  )
}

export default Show
