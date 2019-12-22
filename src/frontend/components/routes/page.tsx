import React, { ReactNode, FunctionComponent } from 'react'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import ErrorBoundary from '../app/error-boundary'
import { ReduxState } from '../../store/store'
import { ErrorMessageBox } from '../ui'

declare const AdminBro: {
  UserComponents: Record<string, FunctionComponent>;
}

type State = {
  isClient: boolean;
}

type PropsFromState = {
  pages: ReduxState['pages'];
}

type Props = PropsFromState & RouteComponentProps<{
  pageName: string;
}>

class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount(): void {
    this.setState({ isClient: true })
  }

  render(): ReactNode {
    const { pages, match } = this.props
    const { params } = match
    const { pageName } = params
    const { isClient } = this.state

    const currentPage = pages.find(page => page.name === pageName)

    if (!currentPage || !isClient) {
      return (
        <ErrorMessageBox title="No component specified">
          <p>You have to specify component</p>
        </ErrorMessageBox>
      )
    }

    const Component = AdminBro.UserComponents[currentPage.component]

    return (
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  pages: state.pages,
})

export default connect(mapStateToProps)(Page)
