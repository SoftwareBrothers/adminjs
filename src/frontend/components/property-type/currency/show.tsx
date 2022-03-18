import React, { PureComponent, ReactNode } from 'react'
import { ValueGroup } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props'
import formatValue from './format-value'

export default class Show extends PureComponent<EditPropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props

    const value = formatValue(record.params[property.path], property.props)

    return <ValueGroup label={property.label}>{value}</ValueGroup>
  }
}
