import React, { ReactChild } from 'react'
import { Link } from 'react-router-dom'
import * as flat from 'flat'

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
  render(): ReactChild {
    const { property, record, resource } = this.props
    const showAction = record.recordActions.find(a => a.name === 'show')
    const unflatten = flat.unflatten(record.params) as Record<string, any>
    const values = unflatten[property.name] || []

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
