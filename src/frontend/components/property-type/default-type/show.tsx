import React, { ReactNode } from 'react'

import { FormGroup, Label } from '../../design-system'
import { ShowPropertyProps } from '../base-property-props'
import DefaultPropertyValue from './default-property-value'

export default class Show extends React.PureComponent<ShowPropertyProps> {
  render(): ReactNode {
    const { property } = this.props
    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <DefaultPropertyValue {...this.props} />
      </FormGroup>
    )
  }
}
