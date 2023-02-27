import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'
import DefaultPropertyValue from './default-property-value'
import { useTranslation } from '../../../hooks'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property } = props
  const { translateProperty } = useTranslation()
  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      <DefaultPropertyValue {...props} />
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultShowProperty')
