import React from 'react'

export default class SidebarHeader extends React.PureComponent {
  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="hamburger hidden">
          <i className="fas fa-bars fa-2x"></i>
        </div>
        <a href="(href=h.dashboardUrl())" className="sidebar-brand">
          <img src={this.props.branding.logo}
                alt={this.props.branding.companyName}
                height="35px"
                width="35px"/>
          <span>{this.props.branding.companyName}</span>
        </a>
      </div>
    )
  }
}
