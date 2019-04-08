import React from 'react'

export default class Show extends React.PureComponent {
  componentDidMount() {
    const { property, record } = this.props
    const value = record.params[property.name]
    this.refs.content.innerHTML = value
  }
  
  render() {
    const { property } = this.props
    const { label } = property

    return (
      <div className="property">
        <div className="card-content">
          <div className="text-small">{label}</div>
          <div className="rich-text-value content" ref="content"></div>
        </div>
      </div>
    )
  }
}
