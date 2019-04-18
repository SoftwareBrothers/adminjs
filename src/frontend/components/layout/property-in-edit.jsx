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
  children: childrenType,
  property: simplifiedPropertyType.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}

PropertyInEdit.defaultProps = {
  error: null,
  children: null,
}

export default PropertyInEdit
