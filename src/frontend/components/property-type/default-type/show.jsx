
import React from 'react'

import PropertyInShow from '../../ui/property-in-show'
import { propertyType, recordType } from '../../../types'

export default class Show extends React.PureComponent {
  render() {
    const { property, record } = this.props

    const value = record.params[property.name]

    const className = property.availableValues ? 'tag' : ''

    return (
      <PropertyInShow property={property}>
        <span className={className}>{value}</span>
      </PropertyInShow>
    )
  }
}

Show.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
}
