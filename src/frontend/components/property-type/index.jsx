import React from 'react'
import defaultType from './default-type'
import boolean from './boolean'
import datetime from './datetime'
import richtext from './richtext'
import reference from './reference'

const types = {
  boolean,
  datetime,
  reference,
  date: datetime,
  richtext,
}

export default class PropertyType extends React.PureComponent {
  render() {
    const { property, resource, record, where, paths} = this.props
    
    const PropertyRenderer = types[property.type] && types[property.type][where] || defaultType[where]

    return (
      <PropertyRenderer
        property={property}
        resource={resource}
        paths={paths}
        record={record}
        onChange={this.props.onChange}
      />
    )
  }
}
