import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'
import DefaultPropertyValue from './default-property-value'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property } = props
  return (
    <ValueGroup label={property.label}>
      <DefaultPropertyValue {...props} />
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultShowProperty')
