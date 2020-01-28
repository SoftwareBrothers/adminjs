import React, { useState } from 'react'
import styled from 'styled-components'
import { space, SpaceProps, position, PositionProps } from 'styled-system'

export const DropDownTrigger = styled.span<SpaceProps>`
  display: inline-block;
  ${space};
`
DropDownTrigger.displayName = 'DropDownTrigger'

const StyledDropDown = styled.div`
  position: relative;
  z-index: 30;
  display: inline-block;
`


export const DropDown: React.FC = (props) => {
  const { children } = props
  const [isVisible, setIsVisible] = useState(false)
  const elements = React.Children.map(children, (child: any) => {
    const type = child && child.type && child.type.displayName
    if (type === 'DropDownTrigger') {
      return React.cloneElement(child, { onHover: () => setIsVisible(!isVisible) })
    }
    if (type === 'DropDownMenu') {
      return React.cloneElement(child, { isVisible })
    }
    return child
  })
  return (
    <StyledDropDown
      onMouseEnter={(): void => setIsVisible(true)}
      onMouseLeave={(): void => setIsVisible(false)}
    >
      {elements}
    </StyledDropDown>
  )
}

export type DropDownMenuProps = PositionProps | {
  isVisible?: boolean;
}

export const DropDownMenu = styled.div<DropDownMenuProps>`
  background: ${({ theme }): string => theme.colors.white};
  display: inline-block;
  position: absolute;
  z-index: 30;
  right: 0;
  top: 24px;
  box-shadow: 0 3px 6px ${({ theme }): string => theme.colors.greyLight};
  min-width: 200px;
  ${({ isVisible }): string => (isVisible ? '' : 'display: none;')};
  ${position};
`

DropDownMenu.displayName = 'DropDownMenu'

export const DropDownItem = styled.span<SpaceProps>`
  border: none;
  color: ${({ theme }): string => theme.colors.darkGrey};
  display: block;
  font-family: ${({ theme }): string => theme.font};
  border: solid transparent;
  border-width: 0 ${({ theme }): string => theme.space[2]};
  &:hover {
    border-color: ${({ theme }): string => theme.colors.bluePrimary};
    background: ${({ theme }): string => theme.colors.greyPale};
  }
  & svg {
    vertical-align: middle;
    padding-bottom: 'sm'px;
    padding-right: ${({ theme }): string => theme.space[3]};
    fill: ${({ theme }): string => theme.colors.greyLight};
  }

  ${space};
`

DropDownItem.defaultProps = {
  px: 4,
  py: 4,
}
