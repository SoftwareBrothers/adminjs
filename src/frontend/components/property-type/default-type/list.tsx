import React from 'react'

import { RecordJSON, ResourceJSON, PropertyJSON } from '../../../interfaces'
import DefaultPropertyValue from './default-property-value'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

export default class List extends React.PureComponent<Props> {
  render(): React.ReactChild {
    return (<DefaultPropertyValue {...this.props} />)
  }
}
