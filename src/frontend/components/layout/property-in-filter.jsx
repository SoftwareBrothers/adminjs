import React from 'react'
import styled from 'styled-components'

import { propertyType, childrenType } from '../../types'
import { colors, sizes } from '../../styles/variables'
import Label from './label'

const Property = styled.div`
  margin: ${sizes.paddingLayout} 0;

  & input {
    border-radius: 0;
    border-color: ${colors.borderOnDark};
    box-shadow: none;
    background: transparent;
    color: ${colors.lightText};

    &:focus {
      border-color: ${colors.primary};
    }
  }
  & .icon {
    opacity: 0.25;
  }
`

const PropertyInFilter = (props) => {
  const { property, children } = props
  return (
    <Property>
      <Label>{property.label}</Label>
      {children}
    </Property>
  )
}

PropertyInFilter.propTypes = {
  property: propertyType.isRequired,
  children: childrenType,
}

PropertyInFilter.defaultProps = {
  children: null,
}

export { Label, Property }

export default PropertyInFilter
