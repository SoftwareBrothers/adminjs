import React, { ReactNode } from 'react'
import styled from 'styled-components'

const DropdownTrigger = styled.div.attrs({
  className: 'dropdown-trigger',
})`
  padding: 0px ${({ theme }): string => theme.sizes.padding};
  font-size: 20px;
  line-height: 20px;
  &:hover {
    background: ${({ theme }): string => theme.colors.bck};
  }
`

const DropdownMenu = styled.div.attrs({
  className: 'dropdown-menu',
})`
  & > .dropdown-content {
    border: 0px none;
    border-radius: 0px;
    box-shadow: 0 6px 13px 0 rgba(69,70,85,0.13);
    background: ${({ theme }): string => theme.colors.bck};
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
const Dropdown: React.FC<Props> = (props) => {
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

/**
 * @memberof Dropdown
 */
type Props = {
  children: ReactNode;
  className?: string;
}

export default Dropdown
