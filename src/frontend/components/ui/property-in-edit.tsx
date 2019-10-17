import React, { ReactNode } from 'react'
import styled from 'styled-components'

import Label from './label'

const Property = styled.div`
  margin-bottom: ${({ theme }): string => theme.sizes.paddingLayout};

  & input {
    border-radius: 0;
    border-color: ${({ theme }): string => theme.colors.border};
    box-shadow: none;
    &:focus {
      border-color: ${({ theme }): string => theme.colors.primary};
    }
  }

  & .control > input[type=text]{
    height: 40px;
  }
`
/**
 * Wrapps input with label and optional error
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
    <Property>
      <Label htmlFor={property.name}>{property.label}</Label>
      <div className="control">
        {children}
      </div>
      {error && (
        <div className="help is-danger">{error.message}</div>
      )}
    </Property>
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
