import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { childrenType } from '../../types'

const DropdownTrigger = styled.div.attrs({
  className: 'dropdown-trigger',
})`
  padding: 0px ${({ theme }) => theme.sizes.padding};
  font-size: 20px;
  line-height: 20px;
  &:hover {
    background: #fff;
  }
`

const DropdownMenu = styled.div.attrs({
  className: 'dropdown-menu',
})`
  & > .dropdown-content {
    border: 0px none;
    border-radius: 0px;
    box-shadow: 0 6px 13px 0 rgba(69,70,85,0.13);
  }
`

/**
 * Representation of a dropdown with buttons.
 *
 * @component
 * @example
 * return (
 * <WrapperBox border style={{height: 200, marginLeft: 200}}>
 *   <Dropdown className="is-right is-hoverable">
 *     <StyledButton className="is-white in-dropdown">Button 1</StyledButton>
 *     <StyledButton className="is-white in-dropdown">Button 2</StyledButton>
 *   </Dropdown>
 * </WrapperBox>
 * )
 */
const Dropdown = (props) => {
  const { children } = props
  let { className = '' } = props
  className += ' dropdown'
  return (
    <div {...props} className={className}>
      <DropdownTrigger>
        <i className="icomoon-options" />
      </DropdownTrigger>
      <DropdownMenu>
        <div className="dropdown-content">
          {children}
        </div>
      </DropdownMenu>
    </div>
  )
}

Dropdown.propTypes = {
  children: childrenType,
  className: PropTypes.string,
}

Dropdown.defaultProps = {
  children: null,
  className: null,
}

export default Dropdown
