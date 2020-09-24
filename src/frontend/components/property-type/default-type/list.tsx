import React from 'react'

import PropertyJSON from '../../../types/property-json.interface'
import RecordJSON from '../../../types/record-json.interface'
import ResourceJSON from '../../../types/resource-json.interface'
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
