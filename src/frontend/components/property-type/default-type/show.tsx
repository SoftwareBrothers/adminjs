import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override.js'
import { ShowPropertyProps } from '../base-property-props.js'
import DefaultPropertyValue from './default-property-value.js'
import { useTranslation } from '../../../hooks/index.js'

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
