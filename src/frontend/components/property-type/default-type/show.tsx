import React, { ReactNode } from 'react'
import { ValueGroup } from '@adminjs/design-system'

import { ShowPropertyProps } from '../base-property-props'
import DefaultPropertyValue from './default-property-value'

export default class Show extends React.PureComponent<ShowPropertyProps> {
  render(): ReactNode {
    const { property } = this.props
    return (
      <ValueGroup label={property.label}>
        <DefaultPropertyValue {...this.props} />
      </ValueGroup>
    )
  }
}
