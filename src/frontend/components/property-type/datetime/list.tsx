import React from 'react'

import mapValue from './map-value'
import { ResourceJSON, RecordJSON, PropertyJSON } from '../../../interfaces'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

export default class List extends React.PureComponent<Props> {
  render(): React.ReactChild {
    const { property, record } = this.props
    const value = mapValue(record.params[property.path], property.type)

    return (
      <span>{value}</span>
    )
  }
}
