import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import BooleanPropertyValue from './boolean-property-value'
import { ShowPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property } = props
  return (
    <ValueGroup label={property.label}>
      <BooleanPropertyValue {...props} />
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultBooleanShowProperty')
