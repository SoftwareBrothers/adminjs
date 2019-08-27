import React from 'react'

import { propertyType, recordType } from '../../../types'
import ReferenceValue from './reference-value'

export default class List extends React.PureComponent {
  render() {
    const { property, record } = this.props
    return (
      <ReferenceValue
        property={property}
        record={record}
      />
    )
  }
}

List.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
}
