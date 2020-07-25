import React from 'react'

import mapValue from './map-value'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

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
