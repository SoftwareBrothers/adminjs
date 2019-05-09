import React from 'react'
import PropTypes from 'prop-types'

import PropertyInEdit from '../../ui/property-in-edit'
import { simplifiedPropertyType, recordType } from '../../../types'

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

    if (nextValue !== value) {
      if (nextValue) {
        this.datepickerRef.current._flatpickr.jumpToDate(nextValue)
      } else {
        this.datepickerRef.current._flatpickr.input.value = ''
      }
    }

    const prevError = record.errors && record.errors[property.name]
    const newError = nextRecord.errors && nextRecord.errors[property.name]

    return prevError !== newError
  }

  setupDatePicker() {
    const { record, property } = this.props
    const defaultDate = (record.params && record.params[property.name]) || null
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
      defaultDate,
      ...options,
    })
    inst.config.onChange.push((dates, text) => {
      this.handleChange(text)
    })
  }

  handleChange(value) {
    const { onChange, property } = this.props
    onChange(property.name, new Date(value))
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
  property: simplifiedPropertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
}
