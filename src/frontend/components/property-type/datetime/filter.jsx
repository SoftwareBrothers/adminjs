import React from 'react'
import PropTypes from 'prop-types'

import PropertyInFilter, { Label } from '../../ui/property-in-filter'
import { propertyType } from '../../../types'
import BackendFilter from '../../../../backend/utils/filter'

const { PARAM_SEPARATOR } = BackendFilter

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.pickerRef = {
      from: React.createRef(),
      to: React.createRef(),
    }
  }

  componentDidMount() {
    this.setupDatePicker('from')
    this.setupDatePicker('to')
  }

  shouldComponentUpdate(nextProps) {
    const { property } = this.props
    const fromKey = `${property.name}${PARAM_SEPARATOR}from`
    const toKey = `${property.name}${PARAM_SEPARATOR}to`
    const nextFilter = nextProps.filter || {}

    if (nextFilter[fromKey]) {
      this.pickerRef.from.current._flatpickr.jumpToDate(nextFilter[fromKey])
    } else {
      this.pickerRef.from.current._flatpickr.input.value = ''
    }

    if (nextFilter[toKey]) {
      this.pickerRef.to.current._flatpickr.jumpToDate(nextFilter[toKey])
    } else {
      this.pickerRef.to.current._flatpickr.input.value = ''
    }
    return false
  }

  setupDatePicker(key) {
    const { property, filter } = this.props
    const fieldKey = `${property.name}.${key}`
    const defaultDate = (filter[fieldKey] && new Date(filter[fieldKey])) || ''

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

    const inst = flatpickr(this.pickerRef[key].current, {
      format: 'Y-m-d H:i',
      defaultDate,
      ...options,
    })
    inst.config.onChange.push((dates, text) => {
      this.handleChange(key, new Date(text))
    })
  }

  handleChange(key, value) {
    const { onChange, property } = this.props
    const date = value !== '' ? new Date(value).toISOString() : ''
    onChange(`${property.name}${PARAM_SEPARATOR}${key}`, date)
  }

  renderFilter(where) {
    const key = where.toLowerCase()
    const { property } = this.props
    const filterKey = `filter-${property.name}`
    return (
      <div>
        <Label>
        -
          {where}
        :
        </Label>
        <div className="control has-icons-right">
          <input
            type="text"
            ref={this.pickerRef[key]}
            className="input filter"
            name={`${filterKey}${PARAM_SEPARATOR}${key}`}
          />
          <span className="icon is-small is-right">
            <i className="icomoon-calendar" />
          </span>
        </div>
      </div>
    )
  }

  render() {
    const { property } = this.props
    return (
      <PropertyInFilter property={property}>
        <div className="date-range">
          {this.renderFilter('From')}
          {this.renderFilter('To')}
        </div>
      </PropertyInFilter>
    )
  }
}

Filter.propTypes = {
  property: propertyType.isRequired,
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }).isRequired,
}
