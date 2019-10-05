
import React, { ReactNode } from 'react'

import PropertyInShow from '../../ui/property-in-show'
import { BasePropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<BasePropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props

    const value = record.params[property.name]

    const className = property.availableValues ? 'tag' : ''

    return (
      <PropertyInShow property={property}>
        <span className={className}>{value}</span>
      </PropertyInShow>
    )
  }
}
