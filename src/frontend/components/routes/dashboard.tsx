import React, { ReactNode } from 'react'
import { connect } from 'react-redux'

import DefaultDashboard from '../app/default-dashboard'
import ErrorBoundary from '../app/error-boundary'
import { ReduxState } from '../../store/store'

declare const AdminBro: {
  UserComponents: Array<string>;
}

type State = {
  isClient: boolean;
}

type PropsFromState = {
  dashboard: {
    component?: string;
  };
}

class Dashboard extends React.Component<PropsFromState, State> {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount(): void {
    this.setState({ isClient: true })
  }

  render(): ReactNode {
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

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  dashboard: state.dashboard,
})

export default connect(mapStateToProps)(Dashboard)
