import React from 'react'
import mapValue from './map-value'

export default class Show extends React.PureComponent {
  render() {
    const { property, record } = this.props
    const value = mapValue(record.params[property.name], property.type)

    const { label } = property

    return (
      <div className="property">
        <div className="card-content">
          <div className="text-small">{label}</div>
          <div>{value}</div>
        </div>
      </div>
    )
  }
}
