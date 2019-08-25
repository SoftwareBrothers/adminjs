import React from 'react'
import PropTypes from 'prop-types'

import PropertyInShow from '../../ui/property-in-show'
import { propertyType, recordType } from '../../../types'
import convertParamsToArrayItems from './convert-params-to-array-items'
import StyledSection from '../../ui/styled-section'

export default class Show extends React.PureComponent {
  render() {
    const { property, record, ItemComponent } = this.props

    const items = convertParamsToArrayItems(property, record)

    return (
      <PropertyInShow property={property}>
        <StyledSection>
          {items.map((item, i) => (
            <ItemComponent
              {...this.props}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              property={{
                ...property,
                name: `${property.name}.${i}`,
                label: `[${i + 1}]`,
                isArray: false,
              }}
            />
          ))}
        </StyledSection>
      </PropertyInShow>
    )
  }
}

Show.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
}
