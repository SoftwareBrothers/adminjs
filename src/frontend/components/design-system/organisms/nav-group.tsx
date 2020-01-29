import React, { useState } from 'react'
import { NavGroupTitle } from '../molecules/nav-group-title'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'
import { Text } from '../atoms/text'

export type NavGroupProps = {
  title: string;
  icon?: string;
}

export const NavGroup: React.FC<NavGroupProps> = (props) => {
  const { title, icon, children } = props
  const [isItOpen, toggleOpen] = useState(true)
  const chevron = isItOpen ? 'ChevronUp' : 'ChevronDown'
  return (
    <Box>
      <NavGroupTitle
        onClick={(): void => toggleOpen(!isItOpen)}
        bg={isItOpen ? 'greyPale' : 'transparent'}
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
