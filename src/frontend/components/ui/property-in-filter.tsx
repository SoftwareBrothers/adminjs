import React, { ReactNode } from 'react'
import styled from 'styled-components'

import Label from './label'

const Property = styled.div`
  margin: ${({ theme }): string => theme.sizes.paddingLayout} 0;

  & input {
    border-radius: 0;
    border-color: ${({ theme }): string => theme.colors.borderOnDark};
    box-shadow: none;
    background: transparent;
    color: ${({ theme }): string => theme.colors.lightText};

    &:focus {
      border-color: ${({ theme }): string => theme.colors.primary};
    }
  }
  & .icon {
    opacity: 0.25;
  }
`

/**
 * Wrapps input with label in Filter
 *
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
const PropertyInFilter: React.FC<Props> = (props) => {
  const { property, children } = props
  return (
    <Property>
      <Label>{property.label}</Label>
      {children}
    </Property>
  )
}

/**
 * @memberof PropertyInFilter
 */
type Props = {
  /**
   * Wrapped input element
   */
  children: ReactNode;
  /**
   * Subset of property object based on {@link PropertyJSON} containing just label and name
   */
  property: {
    /**
     * Property label
     */
    label: string;
    /**
     * Unique property name - its patch.
     */
    name: string;
  };
}

export { Label, Property }

export default PropertyInFilter
