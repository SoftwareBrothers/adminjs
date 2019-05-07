import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { sizes, colors } from '../../styles/variables'

const StyledWrapperBox = styled.section`
  padding: ${sizes.paddingLayout};
  flex-grow: 1;
  border: ${props => (props.border ? `1px solid ${colors.border}` : 'none')};
  background: ${props => (props.border ? '#ffffff' : 'transparent')};
`

/**
 * @classdesc
 * Basic layout element which controls padding.
 *
 * @component
 * @hideconstructor
 * @example
 * return (
 *   <WrapperBox border>
 *     Some inside content
 *   </WrapperBox>
 * )
 */
const WrapperBox = props => (<StyledWrapperBox {...props} />)

WrapperBox.propTypes = {
  /**
   * If wrapper should have a border.
   */
  border: PropTypes.bool,
}

WrapperBox.defaultProps = {
  border: false,
}

export default WrapperBox
