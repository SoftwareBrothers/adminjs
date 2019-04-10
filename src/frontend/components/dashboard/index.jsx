import React from 'react'
import { connect } from "react-redux"
import DefaultDashboard from '../widgets/dashboard'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  renderHeader() {
    const title = this.props.dashboard.title && (
      <div className="overview-title">{this.props.dashboard.title}</div>
    )
    const subtitle = this.props.dashboard.subtitle && (
      <div className="overview-subtitle">{this.props.dashboard.subtitle}</div>
    )
    if (this.props.dashboard.title || this.props.dashboard.subtitle) {
      return (
        <div className="header">
          <div className="overview">
            <div className="columns">
              <div className="column">
                {title}
                {subtitle}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount(){
    this.setState({isClient: true})
  }

  render() {
    let Component
    if (this.props.dashboard &&
        this.props.dashboard.component &&
        AdminBro.Components[this.props.dashboard.component] &&
        this.state.isClient
        ) {
      Component = AdminBro.Components[this.props.dashboard.component]
    } else if (!this.props.dashboard.title && !this.props.dashboard.subtitle) {
      Component = DefaultDashboard
    } else {
      Component = (props) => (<div className='columns'></div>)
    }
    
    return (
      <div className="dashboard">
        {this.renderHeader()}
        <div className="dashboard-content page-builder-content">
          <Component />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  dashboard: state.dashboard,
})

export default connect(mapStateToProps)(Dashboard)
