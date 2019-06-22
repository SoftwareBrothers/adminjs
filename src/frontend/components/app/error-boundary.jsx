import React from 'react'

import { childrenType } from '../../types'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
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

ErrorBoundary.propTypes = {
  children: childrenType.isRequired,
}

export default ErrorBoundary
