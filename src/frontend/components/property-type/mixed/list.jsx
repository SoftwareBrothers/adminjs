import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import { propertyType, recordType, resourceType } from '../../../types'
import Label from '../../ui/label'

export default class List extends React.PureComponent {
  renderItems() {
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

  render() {
    const { property, record, resource } = this.props
    const showAction = resource.recordActions.find(a => a.name === 'show')

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

List.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
  resource: resourceType.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
}
