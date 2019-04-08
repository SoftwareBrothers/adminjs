import React from 'react'

export default class Edit extends React.PureComponent {
  handleChange(event) {
    this.props.onChange(this.props.property.name, event.target.checked)
  }

  render() {
    const { property, resource, record } = this.props
    const value = (record.params && record.params[property.name]) || ''
    const error = record.errors && record.errors[property.name]
    return (
      <div className="field">
        <label htmlFor={property.name} className="label">{property.label}</label>
        <div className="control">
          <input type="checkbox"
                 className="checkbox"
                 id={property.name}
                 name={property.name}
                 onChange={this.handleChange.bind(this)}
                 checked={value}/>
        </div>
        {error && (
          <div className="help is-danger">{error.message}</div>
        )}
      </div>
    )
  }
}
