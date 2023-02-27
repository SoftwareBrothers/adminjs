import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import ReferenceValue from './reference-value'
import { ShowPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'
import { useTranslation } from '../../../hooks'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const { translateProperty } = useTranslation()
  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      <ReferenceValue
        property={property}
        record={record}
      />
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultReferenceShowProperty')
