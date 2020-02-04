
import React, { ReactNode } from 'react'

import { FormGroup, Label } from '../../design-system'
import { ShowPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<ShowPropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props

    const value = record.params[property.name]

    const className = property.availableValues ? 'tag' : ''

    return (
      <FormGroup>
        <Label>{property.label}</Label>
        {typeof value !== 'undefined' ? (
          <span className={className}>{value}</span>
        ) : ''}
      </FormGroup>
    )
  }
}
