import React from 'react'

import mapValue from './map-value.js'
import allowOverride from '../../../hoc/allow-override.js'
import { ShowPropertyProps } from '../base-property-props.js'

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const value = mapValue(record.params[property.path], property.type)

  return (
    <span>{value}</span>
  )
}

export default allowOverride(List, 'DefaultDatetimeListProperty')
