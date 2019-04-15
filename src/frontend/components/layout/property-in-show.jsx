import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { propertyType } from '../../types'
import { fonts, colors, sizes } from '../../styles/variables'

const Property = styled.div`
  margin-bottom: ${sizes.paddingLayout};
`

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  font-size: ${fonts.min};
  color: ${colors.lightText};
  font-weight: normal;
  margin: 0 0 ${sizes.paddingMin} 0;
  letter-spacing: 0.1em;
`

const PropertyInShow = (props) => {
  const { property, children } = props
  return (
    <Property>
      <Label>{property.label}</Label>
      {children}
    </Property>
  )
}

PropertyInShow.propTypes = {
  property: propertyType.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}

PropertyInShow.defaultProps = {
  children: null,
}

export default PropertyInShow
