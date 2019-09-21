import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledWrapperBox = styled.section`
  padding: ${({ theme }) => theme.sizes.paddingLayout};
  flex-grow: 1;
  border: ${props => (props.border ? `1px solid ${props.theme.colors.border}` : 'none')};
  background: ${props => (props.border ? '#ffffff' : 'transparent')};

  & > h1 {
    font-size: 22px;
    margin-top: ${({ theme }) => theme.sizes.padding};
    margin-bottom: ${({ theme }) => theme.sizes.padding};
  }
`

/**
 * Basic layout element which controls padding.
 *
 * @component
 * @example
 * return (
 *   <WrapperBox border>
 *     <h1>Header</h1>
 *     <p>Some inside content</p>
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
