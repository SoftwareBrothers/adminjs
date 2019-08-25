import React from 'react'
import PropTypes from 'prop-types'

import PropertyInShow from '../../ui/property-in-show'
import { simplifiedPropertyType } from '../../../types'
import StyledSection from '../../ui/styled-section'

const Show = (props) => {
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


Show.propTypes = {
  property: simplifiedPropertyType.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
}

export default Show
