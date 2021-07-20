import React from 'react'
import { Link } from 'react-router-dom'
import { Label } from '@adminjs/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers'
import { EditPropertyProps } from '../base-property-props'
import { convertToSubProperty } from './convert-to-sub-property'

interface Props {
  ItemComponent: typeof React.Component;
}

// TODO: define ItemComponent interface
export default class List extends React.PureComponent<Props & EditPropertyProps> {
  renderItems(): React.ReactChild {
    const { property, ItemComponent } = this.props
    return (
      <React.Fragment>
        {property.subProperties.filter(subProperty => !subProperty.isId).map((subProperty) => {
          const subPropertyWithPath = convertToSubProperty(property, subProperty)
          return (
            <div key={subPropertyWithPath.path}>
              <Label inline>{`${subProperty.label}: `}</Label>
              <ItemComponent
                {...this.props}
                property={subPropertyWithPath}
              />
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render(): React.ReactChild {
    const { property, record, resource } = this.props
    const showAction = record.recordActions.find(a => a.name === 'show')

    if (resource.titleProperty.propertyPath === property.propertyPath && showAction) {
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
