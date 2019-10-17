import React, { ReactNode } from 'react'

import PropertyInShow from '../../ui/property-in-show'
import ReferenceValue from './reference-value'
import { PropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<PropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props

    return (
      <PropertyInShow property={property}>
        <ReferenceValue
          property={property}
          record={record}
        />
      </PropertyInShow>
    )
  }
}
