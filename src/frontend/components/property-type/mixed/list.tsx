import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import Label from '../../ui/label'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

interface Props {
  property: PropertyJSON;
  ItemComponent: typeof React.Component;
  record: RecordJSON;
  resource: ResourceJSON;
}

// TODO define ItemComponent interface

export default class List extends React.PureComponent<Props> {
  renderItems(): React.ReactChild {
    const { property, ItemComponent } = this.props
    return (
      <React.Fragment>
        {property.subProperties.map(subProperty => (
          <div>
            <Label style={{ display: 'inline' }}>{`${subProperty.label}: `}</Label>
            <ItemComponent
              {...this.props}
              key={subProperty.name}
              property={{ ...subProperty, name: `${property.name}.${subProperty.name}` }}
            />
          </div>
        ))}
      </React.Fragment>
    )
  }

  render(): React.ReactChild {
    const { property, record, resource } = this.props
    const showAction = record.recordActions.find(a => a.name === 'show')

    if (resource.titleProperty.name === property.name && showAction) {
      const h = new ViewHelpers()
      const href = h.recordActionUrl({
        resourceId: resource.id, recordId: record.id, actionName: 'show',
      })
      return (
        <Link to={href}>{this.renderItems()}</Link>
      )
    }
    return this.renderItems()
  }
}
