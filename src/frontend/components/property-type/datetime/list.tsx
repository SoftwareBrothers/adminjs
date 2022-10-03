import React from 'react'

import mapValue from './map-value'
import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const value = mapValue(record.params[property.path], property.type)

  return (
    <span>{value}</span>
  )
}

export default allowOverride(List, 'DefaultDatetimeListProperty')
