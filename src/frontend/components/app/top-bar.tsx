import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { cssClass, Box, Icon } from '@adminjs/design-system'

import LoggedIn from './logged-in'
import Version from './version'

import { ReduxState } from '../../store/store'


const NavBar = styled(Box)`
  height: ${({ theme }): string => theme.sizes.navbarHeight};
  background: ${({ theme }): string => theme.colors.white};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`

NavBar.defaultProps = {
  className: cssClass('NavBar'),
}

type Props = {
  toggleSidebar: (any) => void;
}

export const TopBar: React.FC<Props> = (props) => {
  const { toggleSidebar } = props
  const [session, paths, versions] = useSelector(
    (state: ReduxState) => [state.session, state.paths, state.versions],
  )
  return (
    <NavBar>
      <Box
        onClick={toggleSidebar}
        display={['flex', 'flex', 'flex', 'flex', 'none']}
        style={{ cursor: 'pointer', alignItems: 'center' }}
      >
        <Icon icon="Menu" size={32} color="grey100" />
      </Box>
      <Version versions={versions} />
      {session && session.email ? <LoggedIn session={session} paths={paths} /> : ''}
    </NavBar>
  )
}

export default TopBar
