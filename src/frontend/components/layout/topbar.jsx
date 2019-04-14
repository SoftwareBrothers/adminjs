import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { pathsType, sessionType } from '../../types'
import { sizes, colors } from '../../styles/variables'
import LoggedIn from './logged-in'

const Navbar = styled.nav.attrs({
  className: 'navbar',
})`
  height: ${sizes.navbarHeight};
  border-bottom: 1px solid ${colors.border};
  padding: 0 ${sizes.paddingLayout};
  flex-shrink: 0;
`

const Topbar = (props) => {
  const { session, paths } = props
  return (
    <Navbar>
      <div className="navbar-menu">
        <div className="navbar-end">
          {session && <LoggedIn session={session} paths={paths} />}
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