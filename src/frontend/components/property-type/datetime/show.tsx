import React, { ReactNode } from 'react'

import mapValue from './map-value'
import PropertyInShow from '../../ui/property-in-show'
import { PropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<PropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props
    const value = mapValue(record.params[property.name])

    return (
      <PropertyInShow property={property}>
        {value}
      </PropertyInShow>
    )
  }
}
