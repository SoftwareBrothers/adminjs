import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import BooleanPropertyValue from './boolean-property-value.js'
import { ShowPropertyProps } from '../base-property-props.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'

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
