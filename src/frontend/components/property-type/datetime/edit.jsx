import React from 'react'
import PropTypes from 'prop-types'

import PropertyInEdit from '../../layout/property-in-edit'
import { propertyType, recordType } from '../../../types'

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.datepickerRef = React.createRef()
  }

  componentDidMount() {
    this.setupDatePicker()
  }

  shouldComponentUpdate(nextProps) {
    const { record, property } = this.props
    const nextRecord = nextProps.record
    const value = (record.params && record.params[property.name]) || ''
    const nextValue = (nextRecord.params && nextRecord.params[property.name]) || ''

    return nextValue !== value
  }

  componentDidUpdate() {
    this.setupDatePicker()
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
    const inst = flatpickr(this.datepickerRef.current, {
      format: 'Y-m-d H:i',
      defaultDate,
      ...options,
    })
    inst.config.onChange.push((dates, text) => {
      this.handleChange(text)
    })
  }

  handleChange(value) {
    const { onChange, property } = this.props
    onChange(property.name, value)
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
            ref={this.datepickerRef}
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

Edit.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
}
