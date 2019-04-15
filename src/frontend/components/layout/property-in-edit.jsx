import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { fonts, colors, sizes } from '../../styles/variables'

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

const Label = styled.label.attrs({
  className: 'label',
})`
  &&& {
    display: block;
    text-transform: uppercase;
    font-size: ${fonts.min};
    color: ${colors.lightText};
    font-weight: normal;
    margin: 0 0 ${sizes.paddingMin} 0;
    letter-spacing: 0.1em;
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
  
}

export default PropertyInEdit
