import React from 'react'
import PropertyInShow from '../../layout/property-in-show'

export default class Show extends React.PureComponent {
  componentDidMount() {
    const { property, record } = this.props
    const value = record.params[property.name]
    this.refs.content.innerHTML = value
  }

  render() {
    const { property } = this.props

    return (
      <PropertyInShow property={property}>
        <div className="rich-text-value content" ref="content" />
      </PropertyInShow>
    )
  }
}
