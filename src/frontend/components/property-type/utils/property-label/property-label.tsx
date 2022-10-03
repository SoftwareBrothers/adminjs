import { Label, LabelProps } from '@adminjs/design-system'
import React from 'react'

import { PropertyJSON } from '../../../../interfaces'
import { PropertyDescription } from '../property-description'
import allowOverride from '../../../../hoc/allow-override'

export type PropertyLabelProps = {
  property: PropertyJSON;
  props?: LabelProps;
}

const PropertyLabel: React.FC<PropertyLabelProps> = (props) => {
  const { property, props: labelProps } = props

  if (property.hideLabel) { return null }

  return (
    <Label
      htmlFor={property.path}
      required={property.isRequired}
      {...labelProps}
    >
      {property.label}
      {property.description && <PropertyDescription property={property} />}
    </Label>
  )
}

const OverridablePropertyLabel = allowOverride(PropertyLabel, 'PropertyLabel')

export {
  OverridablePropertyLabel as default,
  OverridablePropertyLabel as PropertyLabel,
}
