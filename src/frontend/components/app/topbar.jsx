import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { pathsType, sessionType, versionsType } from '../../types'
import LoggedIn from './logged-in'
import Version from './version'

const Navbar = styled.nav.attrs({
  className: 'navbar',
})`
  height: ${({ theme }) => theme.sizes.navbarHeight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 ${({ theme }) => theme.sizes.paddingLayout};
  flex-shrink: 0;
`

const Topbar = (props) => {
  const { session, paths, versions } = props
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

const mapStateToProps = state => ({
  session: state.session,
  paths: state.paths,
  versions: state.versions,
})

Topbar.propTypes = {
  paths: pathsType.isRequired,
  session: sessionType,
  versions: versionsType,
}

Topbar.defaultProps = {
  session: null,
  versions: {
    admin: false,
    app: false,
  },
}

export default connect(mapStateToProps)(Topbar)
