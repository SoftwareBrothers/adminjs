import React from 'react'
import PropTypes from 'prop-types'

import defaultType from './default-type'
import boolean from './boolean'
import datetime from './datetime'
import richtext from './richtext'
import reference from './reference'

import { propertyType, resourceType, recordType } from '../../types'

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
      isClient: false,
    }
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    const { property, resource, record, filter, where, onChange } = this.props
    const { isClient } = this.state

    let PropertyRenderer = (types[property.type] && types[property.type][where])
                          || defaultType[where]
    if (property.components && property.components[where] && isClient) {
      PropertyRenderer = AdminBro.UserComponents[property.components[where]]
    }

    return (
      <PropertyRenderer
        property={property}
        resource={resource}
        record={record}
        filter={filter}
        onChange={onChange}
      />
    )
  }
}

PropertyType.propTypes = {
  property: propertyType.isRequired,
  resource: resourceType.isRequired,
  record: recordType,
  // eslint-disable-next-line react/forbid-prop-types
  filter: PropTypes.object,
  where: PropTypes.oneOf(['edit', 'filter', 'show', 'list']).isRequired,
  onChange: PropTypes.func,
}

PropertyType.defaultProps = {
  filter: {},
  record: null,
  onChange: null,
}

const camelizePropertyType = type => ({
  Edit: type.edit,
  Show: type.show,
  List: type.list,
  Filter: type.filter,
})

PropertyType.DefaultType = camelizePropertyType(defaultType)
PropertyType.Boolean = camelizePropertyType(boolean)
PropertyType.DateTime = camelizePropertyType(datetime)
PropertyType.RichText = camelizePropertyType(richtext)
PropertyType.Reference = camelizePropertyType(reference)
