import React from 'react'
import { ShowPropertyProps } from '../base-property-props'
import { Badge } from '../../design-system'

const DefaultPropertyValue: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props

  const rawValue = record?.params[property.name]

  if (typeof rawValue === 'undefined') {
    return null
  }

  if (property.availableValues) {
    const option = property.availableValues.find(opt => opt.value === rawValue)

    if (!option) {
      return rawValue
    }

    return (
      <Badge>{option?.label || rawValue}</Badge>
    )
  }

  return rawValue
}

export default DefaultPropertyValue
