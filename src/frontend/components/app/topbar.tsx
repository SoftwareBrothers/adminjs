import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import LoggedIn from './logged-in'
import Version from './version'

import { CurrentAdmin } from '../../../current-admin.interface'
import { VersionProps } from '../../../admin-bro-options.interface'
import { ReduxState } from '../../store/store'

const Navbar = styled.nav.attrs({
  className: 'navbar',
})`
  height: ${({ theme }): string => theme.sizes.navbarHeight};
  border-bottom: 1px solid ${({ theme }): string => theme.colors.border};
  padding: 0 ${({ theme }): string => theme.sizes.paddingLayout};
  flex-shrink: 0;
  background: ${({ theme }): string => theme.colors.bck};
`

type PropsFromState = {
  versions: VersionProps;
  session: CurrentAdmin | null;
  paths: {
    logoutPath: string;
  };
}

const Topbar: React.FC<PropsFromState> = (props) => {
  const { session, versions, paths } = props
  return (
    <Navbar>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Version versions={versions} />
        </div>
        <div className="navbar-end">
          {session && session.email ? <LoggedIn session={session} paths={paths} /> : ''}
        </div>
      </div>
    </Navbar>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  session: state.session,
  paths: {
    logoutPath: state.paths.logoutPath,
  },
  versions: state.versions,
})

export default connect(mapStateToProps)(Topbar)
