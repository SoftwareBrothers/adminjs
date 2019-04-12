import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers'

export default class SidebarHeader extends React.PureComponent {
  render() {
    const h = new ViewHelpers({ options: this.props.paths })
    return (
      <div className="sidebar-wrapper">
        <div className="hamburger hidden">
          <i className="fas fa-bars fa-2x"></i>
        </div>
        <Link to={h.dashboardUrl()} className="sidebar-brand">
          <img src={this.props.branding.logo}
                alt={this.props.branding.companyName}
                height="35px"
                width="35px"/>
          <span>{this.props.branding.companyName}</span>
        </Link>
      </div>
    )
  }
}
