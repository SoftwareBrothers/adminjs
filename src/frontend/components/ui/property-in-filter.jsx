import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { childrenType } from '../../types'
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

/**
 * @classdesc
 * Wrapps input with label in Filter
 *
 * @hideconstructor
 * @component
 * @example
 * const property = {
 *   label: 'My amazing property',
 *   name: 'myAmazingProperty',
 * }
 * return (
 *   <WrapperBox style={{ background: '#303b62' }}>
 *     <PropertyInFilter property={property}>
 *       <input className="input" />
 *     </PropertyInFilter>
 *   </WrapperBox>
 * )
 */
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
  /**
   * Wrapped input element
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

PropertyInFilter.defaultProps = {
  children: null,
}

export { Label, Property }

export default PropertyInFilter
