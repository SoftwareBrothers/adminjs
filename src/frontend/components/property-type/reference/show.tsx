import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import ReferenceValue from './reference-value'
import { ShowPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props

  return (
    <ValueGroup label={property.label}>
      <ReferenceValue
        property={property}
        record={record}
      />
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultReferenceShowProperty')
