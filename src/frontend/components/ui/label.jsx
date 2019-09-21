import React from 'react'
import styled from 'styled-components'

import { childrenType } from '../../types'

const StyledLabel = styled.label.attrs({
  className: 'label',
})`
  &&& {
    display: block;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fonts.min};
    color: ${({ theme }) => theme.colors.lightText};
    font-weight: normal;
    margin: 0 0 8px 0;
    letter-spacing: 0.1em;
  }
`

/**
 * @class
 * Represents labels inside the application.
 *
 * @component
 * @example
 * return (
 * <WrapperBox border>
 *   <Label>Some Label:</Label>
 *   <p>Text below the label</p>
 * </WrapperBox>
 * )
 */
const Label = props => (<StyledLabel {...props} />)

Label.propTypes = {
  children: childrenType,
}

Label.defaultProps = {
  children: null,
}

export default Label
