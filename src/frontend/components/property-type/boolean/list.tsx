import React from 'react'

import PropertyJSON from '../../../interfaces/property-json.interface'
import RecordJSON from '../../../interfaces/record-json.interface'
import ResourceJSON from '../../../interfaces/resource-json.interface'
import BooleanPropertyValue from './boolean-property-value'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

export default class List extends React.PureComponent<Props> {
  render(): React.ReactChild {
    return (
      <BooleanPropertyValue {...this.props} />
    )
  }
}
