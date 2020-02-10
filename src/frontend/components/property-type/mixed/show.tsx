import React from 'react'

import { Section, FormGroup, Label } from '../../design-system'
import { BasePropertyProps } from '../base-property-props'

interface Props {
  ItemComponent: typeof React.Component;
}

const Show: React.FC<Props & BasePropertyProps> = (props) => {
  const { property, ItemComponent } = props
  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <Section>
        {property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => (
          <ItemComponent
            {...props}
            key={subProperty.name}
            property={{ ...subProperty, name: `${property.name}.${subProperty.name}` }}
          />
        ))}
      </Section>
    </FormGroup>
  )
}

export default Show
