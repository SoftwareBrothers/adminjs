import React, { ReactNode } from 'react'

import PropertyInEdit from '../../ui/property-in-edit'
import { PropertyProps } from '../base-property-props'
import StyledInput from '../../ui/styled-input'

export default class Edit extends React.Component<PropertyProps> {
  private datepickerRef: React.RefObject<any>

  constructor(props) {
    super(props)
    this.datepickerRef = React.createRef()
  }

  componentDidMount(): void {
    this.setupDatePicker()
  }

  shouldComponentUpdate(nextProps): boolean {
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

  setupDatePicker(): void {
    const { record, property } = this.props
    const defaultDate = (record.params && record.params[property.name]) || null
    let options = {
      format: 'Y-m-d',
      enableTime: false,
      // eslint-disable-next-line @typescript-eslint/camelcase
      time_24hr: false,
    }
    if (property.type === 'datetime') {
      options = {
        format: 'Y-m-d H:i',
        enableTime: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
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

  handleChange(value): void {
    const { onChange, property } = this.props
    onChange(property.name, new Date(value))
  }

  render(): ReactNode {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        <div className="control has-icons-right">
          <StyledInput
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
