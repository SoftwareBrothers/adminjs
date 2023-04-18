import { ValueGroup } from '@adminjs/design-system'
import React, { FC } from 'react'

import { EditPropertyProps } from '../base-property-props.js'
import formatValue from './format-value.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'

const Show: FC<EditPropertyProps> = (props) => {
  const { property, record } = props
  const value = `${record.params[property.path]}`
  const { translateProperty } = useTranslation()
  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      {formatValue(value, property.props)}
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultCurrencyShowProperty')
