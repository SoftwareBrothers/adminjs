import React from 'react'
import { Link } from 'react-router-dom'
import ViewHelpers from '../../../../backend/utils/view-helpers'

export default class List extends React.PureComponent {
  render() {
    const { property, record, resource } = this.props
    const refId = record.params[property.name]
    const populated = record.populated[property.name]
    const value = (populated && populated.title) || refId

    if (resource.recordActions.find(a => a.name === 'show') && populated){
      const h = new ViewHelpers()
      const href = h.recordActionUrl({
        resourceId: property.reference, recordId: refId, actionName: 'show',
      })
      return (
        <Link to={href}>{value}</Link>
      )
    }
    return (
      <span>{value}</span>
    )
  }
}
