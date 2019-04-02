import React from 'react'
import defaultType from './default-type'

const types = {

}

export default class PropertyType extends React.PureComponent {
  render() {
    const { property, resource, record, where} = this.props
    
    const PropertyRenderer = types[property.type] && types[property.type][where] || defaultType[where]

    return (
      <PropertyRenderer
        property={property}
        resource={resource}
        record={record}
      />
    )
  }
}
