import React from 'react'
import * as DesignSystem from '@admin-bro/design-system'
import { ActionProps } from '../action.props'
import PropertyType from '../../property-type'
import { PropertyPlace } from '../../../../backend/decorators/property-json.interface'
import { ParsedLayoutElement } from '../../../../backend/utils/layout-element-parser'
import { BasePropertyProps } from '../../property-type/base-property-props'

type Props = ActionProps & {
  layoutElement: ParsedLayoutElement;
  where: PropertyPlace;
  onChange?: BasePropertyProps['onChange'];
}

const LayoutElementRenderer: React.FC<Props> = (props) => {
  const { layoutElement, resource, where, record, onChange } = props

  const {
    props: layoutProps,
    properties: propertyNames,
    layoutElements: innerLayoutElements,
    component,
  } = layoutElement

  const { children, ...other } = layoutProps

  const properties = propertyNames.map(name => resource.properties[name])

  const Component = DesignSystem[component]
  if (!Component) {
    return (
      <DesignSystem.MessageBox
        size="sm"
        message="Javascript Error"
        variant="danger"
        py="xl"
      >
        There is no component by the name of
        <DesignSystem.Badge size="sm" variant="danger" mx="default">{component}</DesignSystem.Badge>
        in @admin-bro/design-system. Change
        <DesignSystem.Badge size="sm" variant="danger" mx="default">{`@${component}`}</DesignSystem.Badge>
        to available component like @Header
      </DesignSystem.MessageBox>
    )
  }

  return (
    <Component {...other as any}>
      {properties.map(property => (
        <DesignSystem.Box flexGrow={1} key={property.name}>
          <PropertyType
            key={property.name}
            where={where}
            property={property}
            resource={resource}
            record={record}
            onChange={onChange}
          />
        </DesignSystem.Box>
      ))}
      {innerLayoutElements.map((innerLayoutElement, i) => (
        <LayoutElementRenderer
          {...props}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          layoutElement={innerLayoutElement}
        />
      ))}
      {children}
    </Component>
  )
}


export default LayoutElementRenderer
