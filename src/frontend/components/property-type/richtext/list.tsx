import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

export default class List extends React.PureComponent<Props> {
  render(): React.ReactChild {
    const { property, record, resource } = this.props
    const showAction = record.recordActions.find(a => a.name === 'show')
    const original = record.params[property.name] || ''
    const value = original.substring(0, 15) + (original.length > 15 ? '...' : '')

    if (resource.titleProperty.name === property.name && showAction) {
      const h = new ViewHelpers()
      const href = h.recordActionUrl({
        resourceId: resource.id, recordId: record.id, actionName: 'show',
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
