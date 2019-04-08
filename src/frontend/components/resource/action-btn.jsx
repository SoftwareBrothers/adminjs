import React from 'react'
import { Link } from 'react-router-dom'

export default class ActionBtn extends React.PureComponent {
  render() {
    return (
      <div className="control">
        <Link to={this.props.action.href} className={"button " + this.props.className}>
          <span className="icon"><i className={this.props.action.icon}></i></span>
          <div className="btn-text">
            {this.props.action.label}
          </div>
        </Link>
      </div>
    )
  }
}