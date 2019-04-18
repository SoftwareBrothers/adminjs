import React from 'react'
import styled from 'styled-components'

import { propertyType, childrenType } from '../../types'
import { sizes } from '../../styles/variables'

import Label from './label'

const Property = styled.div`
  margin-bottom: ${sizes.paddingLayout};
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
  children: childrenType,
}

PropertyInShow.defaultProps = {
  children: null,
}

export default PropertyInShow
