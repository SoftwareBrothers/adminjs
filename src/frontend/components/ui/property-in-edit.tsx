import React, { ReactNode } from 'react'
import { Box, Label } from '../design-system'

/**
 * Wraps input with label and optional error
 *
 * @component
 * @example <caption>Standard property</caption>
 * const property = {
 *   label: 'My amazing property',
 *   name: 'myAmazingProperty',
 * }
 * const error = { message: 'and there is an error' }
 * return (
 *   <WrapperBox>
 *     <PropertyInEdit property={property} error={error}>
 *       <input className="input" />
 *     </PropertyInEdit>
 *   </WrapperBox>
 * )
 *
 * @example <caption>With an icon</caption>
 * const property = {
 *   label: 'My amazing property',
 *   name: 'myAmazingProperty',
 * }
 * // It is based on the bulma classes
 * return (
 *   <WrapperBox>
 *     <PropertyInEdit property={property}>
 *       <div className="control has-icons-right">
 *         <input className="input" />
 *         <span className="icon is-small is-right">
 *           <i className="fa fa-bomb" />
 *         </span>
 *       </div>
 *     </PropertyInEdit>
 *   </WrapperBox>
 * )
 */
const PropertyInEdit: React.FC<Props> = (props) => {
  const { children, property, error } = props
  return (
    <Box data-testid={`PropertyInEdit-${property.name}`}>
      <Label htmlFor={property.name}>{property.label}</Label>
      <Box>
        {children}
      </Box>
      {error && (
        <p>{error.message}</p>
      )}
    </Box>
  )
}

/**
 * @memberof PropertyInEdit
 */
type Props = {
  /**
   * Wrapped input element
   */
  children: ReactNode;
  /**
   * Property object based on {@link PropertyJSON}
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
  /**
   * Optional error message
   */
  error?: {
    message: string;
  };
}

export default PropertyInEdit
