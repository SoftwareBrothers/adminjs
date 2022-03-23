import { ValueGroup } from '@adminjs/design-system'
import React, { FC } from 'react'
import { EditPropertyProps } from '../base-property-props'
import formatValue from './format-value'

const Show: FC<EditPropertyProps> = (props) => {
  const { property, record } = props
  const value = `${record.params[property.path]}`

  return (
    <ValueGroup label={property.label}>
      {formatValue(value, property.props)}
    </ValueGroup>
  )
}

export default Show
