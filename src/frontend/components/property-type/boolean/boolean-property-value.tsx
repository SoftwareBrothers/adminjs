import React from 'react'
import { Badge } from '@adminjs/design-system'

import { ShowPropertyProps } from '../base-property-props.js'
import { useTranslation } from '../../../hooks/index.js'
import mapValue from './map-value.js'
import allowOverride from '../../../hoc/allow-override.js'

const BooleanPropertyValue: React.FC<ShowPropertyProps> = (props) => {
  const { record, property, resource } = props

  const { tl } = useTranslation()

  const rawValue = record?.params[property.path]

  if (typeof rawValue === 'undefined' || rawValue === '') {
    return null
  }
  const base = mapValue(rawValue)
  const translation = tl(`${property.path}.${rawValue}`, resource.id, {
    defaultValue: base,
  })

  return (
    <Badge outline size="sm">{translation}</Badge>
  )
}

export default allowOverride(BooleanPropertyValue, 'BooleanPropertyValue')
