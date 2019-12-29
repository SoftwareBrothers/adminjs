import React, { ReactNode } from 'react'

import mapValue from './map-value'
import PropertyInShow from '../../ui/property-in-show'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
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
