import React from 'react'

export default class TextBlock extends React.PureComponent {
  render() {
    const columns = this.props.columns || 3
    const offset = this.props.offset || 0
    const title = this.props.title ? (
      <div className='h2'>{this.props.title}</div>
    ) : ''
    const icon = this.props.icon || ''
    const value = this.props.value || ''
    return (
      <div className={`column is-12-tablet is-${columns}-desktop is-offset-${offset}`}>
        <div className="dashboard-block border-box">
          {title}
          {this.props.children}
        </div>
      </div>
    )
  }
}
