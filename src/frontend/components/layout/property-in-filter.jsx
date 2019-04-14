import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { propertyType } from '../../types'
import { fonts, colors, sizes } from '../../styles/variables'

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

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  font-size: ${fonts.min};
  color: ${colors.lightText};
  font-weight: normal;
  margin: ${sizes.paddingMin} 0;
  letter-spacing: 0.1em;
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
}

export { Label, Property }

export default PropertyInFilter
