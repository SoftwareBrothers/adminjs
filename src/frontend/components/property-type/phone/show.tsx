import React, { FC } from 'react'
import { ValueGroup } from '@adminjs/design-system'

import { ShowPropertyProps } from '../base-property-props'
import DefaultPropertyValue from '../default-type/default-property-value'
import allowOverride from '../../../hoc/allow-override'
import { useTranslation } from '../../../hooks'

const Show: FC<ShowPropertyProps> = (props) => {
  const { property } = props
  const { translateProperty } = useTranslation()
  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      <DefaultPropertyValue {...props} />
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultPhoneShowProperty')
