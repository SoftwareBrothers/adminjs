import React from 'react'

export default class Filter extends React.Component {
  handleChange(key, value) {
    let date = value !== '' ? new Date(value).toISOString() : ''
    this.props.onChange(`${this.props.property.name}.${key}`, date)
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
    const inst = flatpickr(this.refs[key], {
      format: 'Y-m-d H:i',
      defaultDate,
      ...options
    })
    inst.config.onChange.push((dates, text) => {
      this.handleChange(key, text)
    })
  }

  componentDidMount() {
    this.setupDatePicker('from')
    this.setupDatePicker('to')
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { property } = this.props
    const fromKey = `${property.name}.from`
    const toKey = `${property.name}.to`
    const nextFilter = nextProps.filter || {}
    
    const from = this.refs.from._flatpickr
    const to = this.refs.to._flatpickr

    nextFilter[fromKey] ? from.jumpToDate(nextFilter[fromKey]) : from.input.value = ''
    nextFilter[toKey] ? to.jumpToDate(nextFilter[toKey]) : to.input.value = ''

    return false
  }

  renderFilter(where) {
    const key = where.toLowerCase()
    const { property } = this.props
    const filterKey = `filter-${property.name}`
    return (
      <div className="filter">
        <label className="label">{where}:</label>
        <div className="control has-icons-right">
          <input
            type="text"
            ref={key}
            className="input filter"
            name={`${filterKey}.${key}`}
             />
          <span className="icon is-small is-right">
            <i className="icomoon-calendar"></i>
          </span>
        </div>
      </div>
    )
  }

  render() {
    const { property, filter } = this.props
    return (
      <div className="picker-name">{property.label}
        <div className="date-range">
          {this.renderFilter('From')}
          {this.renderFilter('To')}
        </div>
      </div>
    )
  }
}
