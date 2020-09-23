import React from 'react'
import { Section, ValueGroup } from '@admin-bro/design-system'

import { BasePropertyProps } from '../base-property-props'

interface Props {
  ItemComponent: typeof React.Component;
}

const Show: React.FC<Props & BasePropertyProps> = (props) => {
  const { property, ItemComponent } = props
  return (
    <ValueGroup label={property.label}>
      <Section>
        {property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => (
          <ItemComponent
            {...props}
            key={subProperty.name}
            property={{ ...subProperty, name: `${property.name}.${subProperty.name}` }}
          />
        ))}
      </Section>
    </ValueGroup>
  )
}

export default Show
