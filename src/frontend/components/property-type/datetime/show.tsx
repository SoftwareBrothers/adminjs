import React, { ReactNode } from 'react'
import { ValueGroup } from '@adminjs/design-system'

import mapValue from './map-value'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props
    const value = mapValue(record.params[property.path], property.type)

    return (
      <ValueGroup label={property.label}>
        {value}
      </ValueGroup>
    )
  }
}
