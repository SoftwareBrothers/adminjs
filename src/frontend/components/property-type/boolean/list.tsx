import React from 'react'

import { RecordJSON, PropertyJSON, ResourceJSON } from '../../../interfaces'
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
