import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { childrenType } from '../../types'

import Label from './label'

const Property = styled.div`
  margin-bottom: ${({ theme }) => theme.sizes.paddingLayout};
`

/**
 * Wrapps input with label in Show
 *
 * @component
 * @example
 * const property = {
  *   label: 'My amazing property',
  *   name: 'myAmazingProperty',
  * }
  * return (
  *   <WrapperBox border>
  *     <PropertyInShow property={property}>
  *       And here goes a property value.
  *     </PropertyInShow>
  *   </WrapperBox>
  * )
 */
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
  /**
   * Wrapped property value
   */
  children: childrenType,
  /**
   * Property object based on {@link BaseProperty~JSON}
   */
  property: PropTypes.shape({
    /**
     * Property label
     */
    label: PropTypes.string.isRequired,
    /**
     * Unique property name - its patch.
     */
    name: PropTypes.string.isRequired,
  }).isRequired,
}

PropertyInShow.defaultProps = {
  children: null,
}

export default PropertyInShow
