import React from 'react'

import PropertyInShow from '../../ui/property-in-show'
import StyledSection from '../../ui/styled-section'
import { BasePropertyProps } from '../base-property-props'

interface Props {
  ItemComponent: typeof React.Component;
}

const Show: React.FC<Props & BasePropertyProps> = (props) => {
  const { property, ItemComponent } = props
  return (
    <PropertyInShow property={property}>
      <StyledSection>
        {property.subProperties.map(subProperty => (
          <ItemComponent
            {...props}
            key={subProperty.name}
            property={{ ...subProperty, name: `${property.name}.${subProperty.name}` }}
          />
        ))}
      </StyledSection>
    </PropertyInShow>
  )
}

export default Show
