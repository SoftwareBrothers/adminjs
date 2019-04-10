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

export default class PropertyType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false
    }
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    const { property, resource, record, filter, where, paths} = this.props
    
    let PropertyRenderer = types[property.type] && types[property.type][where] || defaultType[where]
    if (property.components && property.components[where] && this.state.isClient) {
      PropertyRenderer = AdminBro.Components[property.components[where]]
    }

    return (
      <PropertyRenderer
        property={property}
        resource={resource}
        paths={paths}
        record={record}
        filter={filter}
        onChange={this.props.onChange}
      />
    )
  }
}
