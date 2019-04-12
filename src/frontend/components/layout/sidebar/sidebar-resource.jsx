import React from 'react'
import { Link } from 'react-router-dom'


export default class SidebarResource extends React.PureComponent {
  render() {
    return (
      <li>
        <Link to={this.props.resource.href}>
          {this.props.resource.name}
        </Link>
      </li>
    )
  }
}
