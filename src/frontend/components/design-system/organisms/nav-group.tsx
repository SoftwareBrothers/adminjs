import React, { useState } from 'react'
import { NavGroupTitle } from '../molecules/nav-group-title'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'

export type NavGroupProps = {
  title: string;
  icon?: string;
}

export const NavGroup: React.FC<NavGroupProps> = (props) => {
  const { title, icon, children } = props
  const [isItOpen, toggleOpen] = useState(true)
  const chevron = isItOpen ? 'ChevronUp' : 'ChevronDown'
  return (
    <Box p={0}>
      <NavGroupTitle
        onClick={(): void => toggleOpen(!isItOpen)}
        bg={isItOpen ? 'greyPale' : 'transparent'}
      >
        <Icon icon={icon || 'Settings'} />
        <span>{title}</span>
        <Icon icon={chevron} />
      </NavGroupTitle>
      {isItOpen ? (
        <Box p={0} pl={7} pb={3}>
          {children}
        </Box>
      ) : ''}
    </Box>
  )
}
