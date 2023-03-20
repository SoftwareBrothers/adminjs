import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import ReferenceValue from './reference-value.js'
import { ShowPropertyProps } from '../base-property-props.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'

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
