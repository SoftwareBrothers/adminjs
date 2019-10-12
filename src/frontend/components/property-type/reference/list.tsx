import React, { ReactNode } from 'react'

import ReferenceValue from './reference-value'
import { BasePropertyProps } from '../base-property-props'

export default class List extends React.PureComponent<BasePropertyProps> {
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
