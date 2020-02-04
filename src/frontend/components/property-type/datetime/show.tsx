import React, { ReactNode } from 'react'

import mapValue from './map-value'
import { FormGroup, Label } from '../../design-system'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props
    const value = mapValue(record.params[property.name])

    return (
      <FormGroup>
        <Label>{property.label}</Label>
        {value}
      </FormGroup>
    )
  }
}
