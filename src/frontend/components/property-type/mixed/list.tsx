import React from 'react'
import { Link } from 'react-router-dom'
import { Label } from '@adminjs/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers.js'
import { EditPropertyProps, BasePropertyProps } from '../base-property-props.js'
import { convertToSubProperty } from './convert-to-sub-property.js'
import allowOverride from '../../../hoc/allow-override.js'

type ItemComponentProps = BasePropertyProps;

interface Props extends Record<string, unknown> {
  ItemComponent: React.FC<ItemComponentProps>;
}

const List: React.FC<Props & EditPropertyProps> = (props) => {
  const { property, record, resource, ItemComponent } = props

  const renderItems = () => (
    <>
      {property.subProperties.filter((subProperty) => !subProperty.isId).map((subProperty) => {
        const subPropertyWithPath = convertToSubProperty(property, subProperty)
        return (
          <div key={subPropertyWithPath.path}>
            <Label inline>{`${subProperty.label}: `}</Label>
            <ItemComponent
              {...props}
              property={subPropertyWithPath}
            />
          </div>
        )
      })}
    </>
  )

  const showAction = record.recordActions.find((a) => a.name === 'show')

  if (resource.titleProperty.propertyPath === property.propertyPath && showAction) {
    const h = new ViewHelpers()
    const href = h.recordActionUrl({
      resourceId: resource.id, recordId: record.id, actionName: 'show',
    })
    return (
      <Link to={href}>{renderItems()}</Link>
    )
  }

  return renderItems()
}

export default allowOverride(List, 'DefaultMixedListProperty')
