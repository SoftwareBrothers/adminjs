import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import LoggedIn from './logged-in'
import Version from './version'

import { ReduxState } from '../../store/store'
import { Box, Icon } from '../design-system'
import { cssClass } from '../design-system/utils/css-class'

const NavBar = styled(Box)`
  height: ${({ theme }): string => theme.sizes.navbarHeight};
  border-bottom: 1px solid ${({ theme }): string => theme.colors.grey20};
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

const TopBar: React.FC<Props> = (props) => {
  const { toggleSidebar } = props
  const [session, paths, versions] = useSelector(
    (state: ReduxState) => [state.session, state.paths, state.versions],
  )
  return (
    <NavBar>
      <Box
        py="lg"
        px={['default', 'lg']}
        onClick={toggleSidebar}
        display={['block', 'block', 'block', 'block', 'none']}
        style={{ cursor: 'pointer' }}
      >
        <Icon icon="Menu" size={32} color="grey100" />
      </Box>
      <Version versions={versions} />
      {session && session.email ? <LoggedIn session={session} paths={paths} /> : ''}
    </NavBar>
  )
}

export default TopBar
