import React, { ReactNode } from 'react'
import { ValueGroup } from '@admin-bro/design-system'

import ReferenceValue from './reference-value'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props

    return (
      <ValueGroup label={property.label}>
        <ReferenceValue
          property={property}
          record={record}
        />
      </ValueGroup>
    )
  }
}
