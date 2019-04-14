import React from 'react'
import PropertyInEdit from '../../layout/property-in-edit'

export default class Edit extends React.Component {
  handleChange(event) {
    this.props.onChange(this.props.property.name, event.target.value)
  }

  render() {
    const { property, resource, record } = this.props
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
