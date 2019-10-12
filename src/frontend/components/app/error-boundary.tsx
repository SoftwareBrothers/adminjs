import React, { ReactNode } from 'react'

type State = {
  error: any;
}

class ErrorBoundary extends React.Component<any, State> {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  componentDidCatch(error): void {
    this.setState({ error })
  }

  render(): ReactNode {
    const { children } = this.props

    const { error } = this.state

    if (error !== null) {
      return (
        <div className="notification is-danger">
          <p>{error.toString()}</p>
          <p>See development console for more details...</p>
        </div>
      )
    }

    return children || null
  }
}

export default ErrorBoundary
