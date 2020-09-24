import React from 'react'

import mapValue from './map-value'
import PropertyJSON from '../../../types/property-json.interface'
import RecordJSON from '../../../types/record-json.interface'
import ResourceJSON from '../../../types/resource-json.interface'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

export default class List extends React.PureComponent<Props> {
  render(): React.ReactChild {
    const { property, record } = this.props
    const value = mapValue(record.params[property.name], property.type)

    return (
      <span>{value}</span>
    )
  }
}
