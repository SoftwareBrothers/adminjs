import React, { ReactNode } from 'react'
import { Text, MessageBox } from '@adminjs/design-system'

import { useTranslation } from '../../hooks'

type State = {
  error: any;
}

const ErrorMessage: React.FC<State> = ({ error }) => {
  const { translateMessage } = useTranslation()
  return (
    <MessageBox m="xxl" variant="danger" message="Javascript Error">
      <Text>{error.toString()}</Text>
      <Text mt="default">{translateMessage('seeConsoleForMore')}</Text>
    </MessageBox>
  )
}

export class ErrorBoundary extends React.Component<any, State> {
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
      return (<ErrorMessage error={error} />)
    }

    return children || null
  }
}

export default ErrorBoundary
