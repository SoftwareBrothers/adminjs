import { Label, LabelProps } from '@admin-bro/design-system'
import React from 'react'
import { PropertyJSON } from '../../../../interfaces'

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
    </Label>
  )
}

export {
  PropertyLabel as default,
  PropertyLabel,
}
