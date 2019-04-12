import React from 'react'
import { connect } from "react-redux"

class Topbar extends React.Component {
  render() {
    const LoggedIn = (session) => (
      <div className="navbar-item has-dropdown is-hoverable navbar-user">
        <a className="navbar-link">
          {session.email}
          <img src="https://api.adorable.io/avatars/24/softwarebrothers.png" />
        </a>
        <div className="navbar-dropdown">
          <a className="navbar-item" href={this.props.paths.logoutPath}>
            <span className="fas fa-sign-out-alt"></span>
            Sign out
          </a>
        </div>
      </div>
    )
    return (
      <nav className="navbar">
        <div className="hamburger hidden"><i className="hamburger-icon fas fa-bars fa-2x"></i></div>
        <div className="navbar-menu">
          <div className="navbar-start"></div>
          <div className="navbar-end">
            {this.props.session && this.props.session.email && LoggedIn(this.props.session)}
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
  paths: state.paths,
})

export default connect(mapStateToProps)(Topbar)