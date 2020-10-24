import React from 'react'
import { Section, ValueGroup } from '@admin-bro/design-system'

import { BasePropertyProps } from '../base-property-props'
import { convertToSubProperty } from './convert-to-sub-property'

interface Props {
  ItemComponent: typeof React.Component;
}

const Show: React.FC<Props & BasePropertyProps> = (props) => {
  const { property, ItemComponent } = props
  return (
    <ValueGroup label={property.label}>
      <Section>
        {property.subProperties.filter(subProperty => !subProperty.isId).map((subProperty) => {
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
    </ValueGroup>
  )
}

export default Show
