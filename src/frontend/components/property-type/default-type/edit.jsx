import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import PropertyInEdit from '../../ui/property-in-edit'
import { simplifiedPropertyType, recordType } from '../../../types'

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleInputChange(event) {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  handleSelectChange(selected) {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  renderInput() {
    const { property, record } = this.props
    const value = (record.params && typeof record.params[property.name] !== 'undefined')
      ? record.params[property.name]
      : ''
    if (property.availableValues) {
      const selected = property.availableValues.find(av => av.value === value)
      return (
        <Select
          isClearable
          value={selected}
          options={property.availableValues}
          onChange={this.handleSelectChange}
        />
      )
    }
    return (
      <input
        type="text"
        className="input"
        id={property.name}
        name={property.name}
        onChange={this.handleInputChange}
        value={value}
      />
    )
  }

  render() {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        {this.renderInput()}
      </PropertyInEdit>
    )
  }
}

Edit.propTypes = {
  property: simplifiedPropertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
}
