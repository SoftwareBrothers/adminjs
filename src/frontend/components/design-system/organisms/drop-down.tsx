import React, { useState } from 'react'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

export const DropDownTrigger = styled.span`
  display: inline-block;
  width: 100%;
`
DropDownTrigger.displayName = 'DropDownTrigger'


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
    <div
      onMouseEnter={(): void => setIsVisible(true)}
      onMouseLeave={(): void => setIsVisible(false)}
    >
      {elements}
    </div>
  )
}

export type DropDownMenuProps = {
  isVisible?: boolean;
}

export const DropDownMenu = styled.div<DropDownMenuProps>`
  position: absolute;
  box-shadow: 0 3px 6px ${({ theme }): string => theme.colors.greyLight};
  ${({ isVisible }): string => (isVisible ? '' : 'display: none;')};
`

DropDownMenu.displayName = 'DropDownMenu'

export const DropDownItem = styled.span<SpaceProps>`
  border: none;
  color: ${({ theme }): string => theme.colors.darkGrey};
  display: block;
  font-family: ${({ theme }): string => theme.font};
  ${space};
  border: solid transparent;
  border-width: 0 ${({ theme }): string => theme.space[2]};
  &:hover {
    border-color: ${({ theme }): string => theme.colors.bluePrimary};
    background: ${({ theme }): string => theme.colors.greyPale};
  }
`

DropDownItem.defaultProps = {
  px: 4,
  py: 3,
}
