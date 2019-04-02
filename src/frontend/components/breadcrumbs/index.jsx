import React from 'react'
import { Link } from 'react-router-dom'

// - showAction = resource.decorate().recordActions(record).find(a => a.name === 'show')
//   nav.breadcrumb(aria-label="breadcrumbs")
//     ul
//       if resource
//         li(class={ 'is-active' : !record })
//           a(href=h.listUrl(resource))=resource.decorate().getResourceName()
//       if record && showAction
//         li(class={ 'is-active' : !actionName })
//           a(href=h.recordActionUrl(resource, showAction, record))= resource.decorate().titleOf(record)
//       if actionName
//         li.is-active
//           a= actionName

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