import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import PropertyInShow from '../../ui/property-in-show'
import { propertyType, recordType, resourceType } from '../../../types'

export default class Show extends React.PureComponent {
  valueElement() {
    const h = new ViewHelpers()
    const { property, record, resource } = this.props
    const refId = record.params[property.name]
    const populated = record.populated[property.name]
    const value = (populated && populated.title) || refId

    if (resource.recordActions.find(a => a.name === 'show') && populated) {
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

    return (
      <PropertyInShow property={property}>
        {this.valueElement()}
      </PropertyInShow>
    )
  }
}

Show.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
  resource: resourceType.isRequired,
}
