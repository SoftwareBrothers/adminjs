import React from 'react'
import { Badge } from '@admin-bro/design-system'

import { ShowPropertyProps } from '../base-property-props'
import { useTranslation } from '../../../hooks'
import mapValue from './map-value'

const BooleanPropertyValue: React.FC<ShowPropertyProps> = (props) => {
  const { record, property, resource } = props

  const { translateProperty } = useTranslation()

  const rawValue = record?.params[property.path]

  if (typeof rawValue === 'undefined' || rawValue === '') {
    return null
  }
  const base = mapValue(rawValue)
  const translation = translateProperty(`${property.path}.${rawValue}`, resource.id, {
    defaultValue: base,
  })

  return (
    <Badge outline size="sm">{translation}</Badge>
  )
}

export default BooleanPropertyValue
