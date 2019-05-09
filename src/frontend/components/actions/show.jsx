import React from 'react'

import PropertyType from '../property-type'
import WrapperBox from '../ui/wrapper-box'
import { resourceType, recordType } from '../../types'

/**
 * @name ShowAction
 * @category Actions
 * @description Shows a given record.
 * @component
 * @private
 */
const Show = (props) => {
  const { resource, record } = props
  const properties = resource.showProperties

  return (
    <WrapperBox border>
      {properties.map(property => (
        <PropertyType
          key={property.name}
          where="show"
          property={property}
          resource={resource}
          record={record}
        />
      ))}
    </WrapperBox>
  )
}

Show.propTypes = {
  /**
   * Object of type: {@link BaseResource~JSON}
   */
  resource: resourceType.isRequired,
  /**
   * Id of a given record
   */
  record: recordType.isRequired,
}

export default Show
