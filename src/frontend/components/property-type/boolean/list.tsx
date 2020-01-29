import React from 'react'

import mapValue from './map-value'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { Badge } from '../../design-system'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

export default class List extends React.PureComponent<Props> {
  render(): React.ReactChild {
    const { property, record } = this.props
    const value = mapValue(record.params[property.name])

    if (!value) {
      // when empty string return this without the badge
      return value
    }

    return (
      <Badge outline size="sm">{value ?? value}</Badge>
    )
  }
}
