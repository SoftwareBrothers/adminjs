import React from 'react'

import PropertyInShow from '../../ui/property-in-show'
import ReferenceValue from './reference-value'
import { propertyType, recordType } from '../../../types'

export default class Show extends React.PureComponent {
  render() {
    const { property, record } = this.props

    return (
      <PropertyInShow property={property}>
        <ReferenceValue
          property={property}
          record={record}
        />
      </PropertyInShow>
    )
  }
}

Show.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
}
