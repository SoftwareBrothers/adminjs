import React from 'react'
import PropertyInEdit from '../../layout/property-in-edit'

export default class Edit extends React.Component {
  handleChange(value) {
    this.props.onChange(this.props.property.name, value)
  }

  setupDatePicker() {
    const { record, property } = this.props
    const defaultDate = (record.params && record.params[property.name]) || ''
    let options = {
      format: 'Y-m-d',
    }
    if (property.type === 'datetime') {
      options = {
        format: 'Y-m-d H:i',
        enableTime: true,
        time_24hr: true,
      }
    }
    const inst = flatpickr(this.refs.datepicker, {
      format: 'Y-m-d H:i',
      defaultDate,
      ...options
    })
    inst.config.onChange.push((dates, text) => {
      this.handleChange(text)
    })
  }

  componentDidMount() {
    this.setupDatePicker()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { record, property } = this.props
    const nextRecord = nextProps.record
    const value = (record.params && record.params[property.name]) || ''
    const nextValue = (nextRecord.params && nextRecord.params[property.name]) || ''
    
    return nextValue !== value
  }

  componentDidUpdate() {
    this.setupDatePicker()
  }

  render() {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        <div className="control has-icons-right">
          <input
            type="text"
            className="input pickadate"
            id={property.name}
            ref="datepicker"
            name={property.name}
          />
          <span className="icon is-small is-right">
            <i className="icomoon-calendar" />
          </span>
        </div>
      </PropertyInEdit>
    )
  }
}
