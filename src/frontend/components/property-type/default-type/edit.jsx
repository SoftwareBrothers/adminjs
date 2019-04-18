import React from 'react'
import PropTypes from 'prop-types'

import PropertyInEdit from '../../layout/property-in-edit'
import { simplifiedPropertyType, recordType } from '../../../types'

export default class Edit extends React.Component {
  handleChange(event) {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  render() {
    const { property, record } = this.props
    const value = (record.params && record.params[property.name]) || ''
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        <input
          type="text"
          className="input"
          id={property.name}
          name={property.name}
          onChange={this.handleChange.bind(this)}
          value={value}
        />
      </PropertyInEdit>
    )
  }
}

Edit.propTypes = {
  property: simplifiedPropertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
}
