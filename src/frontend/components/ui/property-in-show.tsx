import React, { ReactNode } from 'react'
import { Box, Label } from '../design-system'

/**
 * Wraps input with label in Show
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
const PropertyInShow: React.FC<Props> = (props) => {
  const { property, children } = props
  return (
    <Box data-testid={`PropertyInShow-${property.name}`} mb="xl">
      <Label>{property.label}</Label>
      {children}
    </Box>
  )
}

/**
 * @memberof PropertyInShow
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

PropertyInShow.defaultProps = {
  children: null,
}

export default PropertyInShow
