import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { pathsType, sessionType } from '../../types'
import LoggedIn from './logged-in'
// import Hamburger from './sidebar/hamburger'

const Navbar = styled.nav.attrs({
  className: 'navbar',
})`
  height: ${({ theme }) => theme.sizes.navbarHeight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 ${({ theme }) => theme.sizes.paddingLayout};
  flex-shrink: 0;
`

const Topbar = (props) => {
  const { session, paths } = props
  return (
    <Navbar>
      {/* <a onClick={toggleSidebar}>
        <Hamburger />
      </a> */}
      <div className="navbar-menu">
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
})

Topbar.propTypes = {
  paths: pathsType.isRequired,
  session: sessionType,
}

Topbar.defaultProps = {
  session: null,
}

export default connect(mapStateToProps)(Topbar)
