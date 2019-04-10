import React from 'react'

export default class Block extends React.PureComponent {
  render() {
    const columns = this.props.columns || 3
    const offset = this.props.offset || 0
    const title = this.props.title || ''
    const subtitle = this.props.title || ''
    const icon = this.props.icon || ''
    const value = this.props.value || ''
    return (
      <div className={`column is-12-tablet is-${columns}-desktop is-offset-${offset}`}>
        <div className="dashboard-block border-box">
          <div className="block-title">{title}</div>
          <div className="block-content">
            <div className="value">{value}</div>
            <i className={icon}></i>
          </div>
        </div>
      </div>
    )
  }
}

