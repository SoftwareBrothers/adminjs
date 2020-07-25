import React, { ReactNode } from 'react'
import { FormGroup, Label } from '@admin-bro/design-system'

import ReferenceValue from './reference-value'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props

    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <ReferenceValue
          property={property}
          record={record}
        />
      </FormGroup>
    )
  }
}
