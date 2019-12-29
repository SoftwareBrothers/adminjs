import React, { ReactNode } from 'react'

import ReferenceValue from './reference-value'
import { EditPropertyProps } from '../base-property-props'

export default class List extends React.PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props
    return (
      <ReferenceValue
        property={property}
        record={record}
      />
    )
  }
}
