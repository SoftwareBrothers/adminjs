import React from 'react'

import formatValue from './format-value'
import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const value = formatValue(record.params[property.path], property.props)

  return <span>{value}</span>
}

export default allowOverride(List, 'DefaultCurrencyListProperty')
