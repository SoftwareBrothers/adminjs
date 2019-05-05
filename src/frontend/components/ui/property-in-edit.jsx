import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colors, sizes } from '../../styles/variables'
import { simplifiedPropertyType, childrenType } from '../../types'

import Label from './label'

const Property = styled.div`
  margin-bottom: ${sizes.paddingLayout};

  & input {
    border-radius: 0;
    border-color: ${colors.border};
    box-shadow: none;
    &:focus {
      border-color: ${colors.primary};
    }
  }
`
/**
 * @classdesc
 * Wrapps input with label and optional error
 *
 * @hideconstructor
 * @component
 * props = {
 *   property: {
 *     label: 'User Name',
 *     name: 'username',
 *   },
 *   children: 'wrapped component',
 *   error: {
 *     message: 'some error message',
 *   }
 * }
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
  property: simplifiedPropertyType.isRequired,
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
