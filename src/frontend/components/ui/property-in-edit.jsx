import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { childrenType } from '../../types'

import Label from './label'

const Property = styled.div`
  margin-bottom: ${({ theme }) => theme.sizes.paddingLayout};

  & input {
    border-radius: 0;
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: none;
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
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
const PropertyInEdit = (props) => {
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

PropertyInEdit.propTypes = {
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
  /**
   * Optional error message
   */
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}

PropertyInEdit.defaultProps = {
  error: null,
  children: null,
}

export default PropertyInEdit
