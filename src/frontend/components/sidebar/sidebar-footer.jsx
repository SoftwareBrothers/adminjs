import React from 'react'

export default class SidebarFooter extends React.PureComponent {
  render() {
    return (
      <div className="sidebar-footer">
        <p className="sidebar-created-by">
          With<i className="fas fa-heart"></i>
          by
          <a href="http://softwarebrothers.co" target="_blank">
            SoftwareBrothers
          </a>
        </p>
      </div>
    )
  }
}
