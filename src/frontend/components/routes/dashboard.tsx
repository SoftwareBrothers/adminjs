import React, { ReactNode, FunctionComponent } from 'react'
import { connect } from 'react-redux'

import DefaultDashboard from '../app/default-dashboard'
import ErrorBoundary from '../app/error-boundary'
import { ReduxState } from '../../store/store'

declare const AdminJS: {
  UserComponents: Record<string, FunctionComponent>;
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
  constructor(props: PropsFromState) {
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
        && AdminJS.UserComponents[dashboard.component]
    ) {
      Component = AdminJS.UserComponents[dashboard.component] as FunctionComponent
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
