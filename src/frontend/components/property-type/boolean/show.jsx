import React from 'react'

import mapValue from './map-value'
import PropertyInShow from '../../ui/property-in-show'
import { propertyType, recordType } from '../../../types'

export default class Show extends React.PureComponent {
  render() {
    const { property, record } = this.props

    const value = mapValue(record.params[property.name])

    return (
      <PropertyInShow property={property}>
        {value}
      </PropertyInShow>
    )
  }
}

Show.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
}
