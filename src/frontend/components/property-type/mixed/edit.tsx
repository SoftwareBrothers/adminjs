import React from 'react'
import { Section, FormGroup, FormMessage } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { PropertyLabel } from '../../app/property-label'

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
        {property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => (
          <ItemComponent
            {...props}
            key={subProperty.path}
            property={subProperty}
          />
        ))}
      </Section>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default Edit
