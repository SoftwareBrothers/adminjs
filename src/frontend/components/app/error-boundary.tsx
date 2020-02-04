import React, { ReactNode } from 'react'
import { MessageBox } from '../design-system/molecules/message-box'
import { Text } from '../design-system'

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
        <MessageBox m="xxl" variant="error" message="Javascript Error">
          <Text>{error.toString()}</Text>
          <Text mt="default">See development console for more details...</Text>
        </MessageBox>
      )
    }

    return children || null
  }
}

export default ErrorBoundary
