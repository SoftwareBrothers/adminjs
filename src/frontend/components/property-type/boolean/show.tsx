import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import BooleanPropertyValue from './boolean-property-value'
import { ShowPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'
import { useTranslation } from '../../../hooks'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property } = props
  const { translateProperty } = useTranslation()
  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      <BooleanPropertyValue {...props} />
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultBooleanShowProperty')
