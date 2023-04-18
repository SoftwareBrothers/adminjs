import React from 'react'
import { Section, FormGroup, FormMessage } from '@adminjs/design-system'

import { EditPropertyProps } from '../base-property-props.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import { convertToSubProperty } from './convert-to-sub-property.js'
import allowOverride from '../../../hoc/allow-override.js'

type Props = {
  ItemComponent: typeof React.Component;
}

const Edit: React.FC<Props & EditPropertyProps> = (props) => {
  const { property, record, ItemComponent } = props
  const error = record.errors && record.errors[property.path]
  return (
    <FormGroup error={!!error}>
      <PropertyLabel property={property} />
      <Section {...property.props}>
        {property.subProperties.filter((subProperty) => !subProperty.isId).map((subProperty) => {
          const subPropertyWithPath = convertToSubProperty(property, subProperty)
          return (
            <ItemComponent
              {...props}
              key={subPropertyWithPath.path}
              property={subPropertyWithPath}
            />
          )
        })}
      </Section>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default allowOverride(Edit, 'DefaultMixedEditProperty')
