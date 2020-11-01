import React, { ReactNode } from 'react'
import { ValueGroup } from '@admin-bro/design-system'

import BooleanPropertyValue from './boolean-property-value'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property } = this.props

    return (
      <ValueGroup label={property.label}>
        <BooleanPropertyValue {...this.props} />
      </ValueGroup>
    )
  }
}
