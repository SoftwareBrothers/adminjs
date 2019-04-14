import React from 'react'
import PropertyInShow from '../../layout/property-in-show'

export default class Show extends React.PureComponent {
  render() {
    const { property, record } = this.props

    const value = record.params[property.name]

    return (
      <PropertyInShow property={property}>
        {value}
      </PropertyInShow>
    )
  }
}
