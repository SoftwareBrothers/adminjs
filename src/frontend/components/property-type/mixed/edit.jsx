import React from 'react'
import PropTypes from 'prop-types'

import PropertyInEdit from '../../ui/property-in-edit'
import { simplifiedPropertyType, recordType } from '../../../types'
import StyledSection from '../../ui/styled-section'

const Edit = (props) => {
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


Edit.propTypes = {
  property: simplifiedPropertyType.isRequired,
  record: recordType.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
}

export default Edit
