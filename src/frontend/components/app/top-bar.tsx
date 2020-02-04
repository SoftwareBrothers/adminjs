import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import LoggedIn from './logged-in'
import Version from './version'

import { CurrentAdmin } from '../../../current-admin.interface'
import { VersionProps } from '../../../admin-bro-options.interface'
import { ReduxState } from '../../store/store'
import { Box } from '../design-system'

const NavBar = styled(Box)`
  height: ${({ theme }): string => theme.sizes.navbarHeight};
  border-bottom: 1px solid ${({ theme }): string => theme.colors.greyPale};
  background: ${({ theme }): string => theme.colors.white};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`

type PropsFromState = {
  versions: VersionProps;
  session: CurrentAdmin | null;
  paths: {
    logoutPath: string;
  };
}

const TopBar: React.FC<PropsFromState> = (props) => {
  const { session, versions, paths } = props
  return (
    <NavBar>
      <Version versions={versions} />
      {session && session.email ? <LoggedIn session={session} paths={paths} /> : ''}
    </NavBar>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  session: state.session,
  paths: {
    logoutPath: state.paths.logoutPath,
  },
  versions: state.versions,
})

export default connect(mapStateToProps)(TopBar)
