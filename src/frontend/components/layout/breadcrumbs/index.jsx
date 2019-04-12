import React from 'react'
import { Link } from 'react-router-dom'

export default class Breadcrumbs extends React.PureComponent {
  renderResource() {
    const { resource, record } = this.props
    return (
        <li>
          <Link to={resource.href} className={record && 'is-active'}>
            {resource.name}
          </Link>
        </li>
    )
  }

  renderAction() {
    const { actionName } = this.props
    return actionName && (<li className="is-active"><a>{actionName}</a></li>)
  }

  render() {
    return (
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          {this.renderResource()}
          {this.renderAction()}
        </ul>
      </nav>
    )
  }
}