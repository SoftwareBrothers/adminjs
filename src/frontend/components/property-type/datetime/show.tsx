import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override'
import mapValue from './map-value'
import { ShowPropertyProps } from '../base-property-props'
import { useTranslation } from '../../../hooks'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const { translateProperty } = useTranslation()
  const value = mapValue(record.params[property.path], property.type)

  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      {value}
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultDatetimeShowProperty')
