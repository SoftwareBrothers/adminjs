import React from 'react'
import { ShowPropertyProps } from '../base-property-props'
import { useTranslation } from '../../../hooks'
import { Badge } from '../../design-system'
import mapValue from './map-value'

const BooleanPropertyValue: React.FC<ShowPropertyProps> = (props) => {
  const { record, property, resource } = props

  const { translateProperty } = useTranslation()

  const rawValue = record?.params[property.name]

  if (typeof rawValue === 'undefined' || rawValue === '') {
    return null
  }
  const base = mapValue(rawValue)
  const translation = translateProperty(`${property.name}.${rawValue}`, resource.id, {
    defaultValue: base,
  })

  return (
    <Badge outline size="sm">{translation}</Badge>
  )
}

export default BooleanPropertyValue
