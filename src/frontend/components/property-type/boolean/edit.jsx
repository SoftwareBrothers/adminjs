import React from 'react'
import PropTypes from 'prop-types'

import { simplifiedPropertyType, recordType } from '../../../types'
import PropertyInEdit from '../../ui/property-in-edit'

export default class Edit extends React.PureComponent {
  handleChange(event) {
    const { property, onChange } = this.props
    const { checked } = event.target
    onChange(property.name, checked)
  }

  render() {
    const { property, record } = this.props
    const value = (record.params && record.params[property.name]) || ''
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        <input
          type="checkbox"
          className="checkbox"
          id={property.name}
          name={property.name}
          onChange={this.handleChange.bind(this)}
          checked={value}
        />
      </PropertyInEdit>
    )
  }
}

Edit.propTypes = {
  property: simplifiedPropertyType.isRequired,
  onChange: PropTypes.func.isRequired,
  record: recordType.isRequired,
}
