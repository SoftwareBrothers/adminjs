import React from 'react'

import PropertyInEdit from '../../ui/property-in-edit'
import StyledSection from '../../ui/styled-section'
import { PropertyProps } from '../base-property-props'

type Props = {
  ItemComponent: typeof React.Component;
}

const Edit: React.FC<Props & PropertyProps> = (props) => {
  const { property, record, ItemComponent } = props
  const error = record.errors && record.errors[property.name]
  return (
    <PropertyInEdit property={property} error={error}>
      <StyledSection>
        {property.subProperties.map(subProperty => (
          <ItemComponent
            {...props}
            key={subProperty.name}
            property={{ ...subProperty, name: `${property.name}.${subProperty.name}` }}
          />
        ))}
      </StyledSection>
    </PropertyInEdit>
  )
}

export default Edit
