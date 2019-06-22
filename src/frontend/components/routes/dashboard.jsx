import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DefaultDashboard from '../app/default-dashboard'
import ErrorBoundary from '../app/error-boundary'

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
        && AdminBro.UserComponents[dashboard.component]
    ) {
      Component = AdminBro.UserComponents[dashboard.component]
    } else {
      Component = DefaultDashboard
    }

    return (
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard,
})

Dashboard.propTypes = {
  dashboard: PropTypes.shape({
    component: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps)(Dashboard)
