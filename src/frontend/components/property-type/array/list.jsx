import React from 'react'
import { Link } from 'react-router-dom'
import flat from 'flat'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import { propertyType, recordType, resourceType } from '../../../types'

const { unflatten } = flat

export default class List extends React.PureComponent {
  render() {
    const { property, record, resource } = this.props
    const showAction = resource.recordActions.find(a => a.name === 'show')
    const values = unflatten(record.params)[property.name] || []

    if (resource.titleProperty.name === property.name && showAction) {
      const h = new ViewHelpers()
      const href = h.recordActionUrl({
        resourceId: resource.id, recordId: record.id, actionName: 'show',
      })
      return (
        <Link to={href}>{`length: ${values.length}`}</Link>
      )
    }

    return (
      <span>{`length: ${values.length}`}</span>
    )
  }
}

List.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
  resource: resourceType.isRequired,
}
