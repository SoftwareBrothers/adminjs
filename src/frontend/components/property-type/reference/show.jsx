import React from 'react'
import { Link } from 'react-router-dom'
import ViewHelpers from '../../../../backend/utils/view-helpers'

export default class Show extends React.PureComponent {
  valueElement() {
    const h = new ViewHelpers()
    const { property, record, resource } = this.props
    const refId = record.params[property.name]
    const populated = record.populated[property.name]
    const value = (populated && populated.title) || refId
    
    if (resource.recordActions.find(a => a.name === 'show') && populated){
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

  render() {
    
    const { property } = this.props
    const { label } = property

    return (
      <div className="property">
        <div className="card-content">
          <div className="text-small">{label}</div>
          <div>
            {this.valueElement()}
          </div>
        </div>
      </div>
    )
  }
}
