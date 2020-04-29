import React, { ReactNode } from 'react'

import BooleanPropertyValue from './boolean-property-value'
import { FormGroup, Label } from '../../design-system'
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
