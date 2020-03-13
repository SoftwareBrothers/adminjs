import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'
import { Text } from '../atoms/text'
import { cssClass } from '../utils/css-class'

const NavGroupTitle = styled(Text)`
  padding: 11px 20px;
  color: ${({ theme }): string => theme.colors.grey100};
  border-radius: 9999px;
  display: flex;
  cursor: pointer;

  & > ${Text} {
    display: block;
    flex-grow: 1;
    line-height: ${({ theme }): string => theme.lineHeights.default};
  }

  & svg {
    vertical-align: middle;
    padding-bottom: 2px;
    flex-shrink: 0;
  }
  & svg:first-child {
    padding-right: ${({ theme }): string => theme.space.lg};
  }

  & svg:last-child {
    
  }
`

NavGroupTitle.defaultProps = {
  className: cssClass('NavGroupTitle'),
}

/**
 * @memberof NavGroup
 * @alias NavGroupProps
 */
export type NavGroupProps = {
  /** Title of the navigation group */
  title: string;
  /** Optional icon */
  icon?: string;
}

/**
 * NavGroup is used in a navigation sidebar to group similar elements
 *
 * Usage
 * ```javascript
 * import { NavGroup, NavGroupProps } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Molecules
 * @example
 * return (
 *   <Box py="xl">
 *     <NavGroup title="Some group title" icon="Add">
 *       <Text>Some group element</Text>
 *     </NavGroup>
 *   </Box>
 * )
 */
export const NavGroup: React.FC<NavGroupProps> = (props) => {
  const { title, icon, children } = props
  const [isItOpen, toggleOpen] = useState(true)
  const chevron = isItOpen ? 'ChevronUp' : 'ChevronDown'
  return (
    <Box className={cssClass('NavGroup')}>
      <NavGroupTitle
        onClick={(): void => toggleOpen(!isItOpen)}
        bg={isItOpen ? 'grey20' : 'transparent'}
      >
        <Icon icon={icon || 'Settings'} />
        <Text>{title}</Text>
        <Icon icon={chevron} />
      </NavGroupTitle>
      {isItOpen ? (
        <Box pl="x3" pb="xl" pt="sm">
          {children}
        </Box>
      ) : ''}
    </Box>
  )
}

export default NavGroup
