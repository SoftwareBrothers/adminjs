import React, { FC } from 'react'
import { ValueGroup } from '@adminjs/design-system'

import { ShowPropertyProps } from '../base-property-props'
import DefaultPropertyValue from '../default-type/default-property-value'

const Show: FC<ShowPropertyProps> = (props) => {
  const { property } = props
  return (
    <ValueGroup label={property.label}>
      <DefaultPropertyValue {...props} />
    </ValueGroup>
  )
}

export default Show
