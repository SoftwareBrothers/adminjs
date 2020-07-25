import React, { ReactNode } from 'react'
import { FormGroup, Label } from '@admin-bro/design-system'

import BooleanPropertyValue from './boolean-property-value'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property } = this.props

    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <BooleanPropertyValue {...this.props} />
      </FormGroup>
    )
  }
}
