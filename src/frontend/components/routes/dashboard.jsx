import React from 'react'
import { connect } from 'react-redux'
import DefaultDashboard from '../widgets/default-dashboard'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    const { dashboard } = this.props
    const { isClient } = this.state
    let Component
    if (dashboard && dashboard.component && isClient
        && AdminBro.Components[dashboard.component]
    ) {
      Component = AdminBro.Components[dashboard.component]
    } else {
      Component = DefaultDashboard
    }

    return (
      <Component />
    )
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard,
})

export default connect(mapStateToProps)(Dashboard)
