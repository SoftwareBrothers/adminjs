import React from 'react'
import SidebarResource from './sidebar-resource'

export default class SidebarParent extends React.PureComponent {
  render() {
    return (
      <li>
        <span className="menu-item-main">
          <i className={this.props.parent.icon}></i>
          {this.props.parent.name}
        </span>
        <ul className="menu-list dropdown-list">
          {this.props.parent.resources.map(resource => (
            <SidebarResource resource={resource} key={resource.id} />
          ))}
        </ul>
      </li>
    )
  }
}
