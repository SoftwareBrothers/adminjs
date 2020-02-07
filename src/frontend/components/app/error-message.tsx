import React, { ReactNode } from 'react'
import { MessageBox, Text } from '../design-system'

type Props = {
  children: ReactNode;
}

/**
 * @memberof ErrorMessageBox
 * @alias ErrorMessageBoxProps
 */
export type ErrorMessageBoxProps = {
  title: string;
  children: ReactNode;
  testId?: string;
}

/**
 * @class
 * Prints error message
 *
 * @component
 * @example
 * return (
 * <ErrorMessageBox title={'Some error'}>
 *   <p>Text below the title</p>
 * </ErrorMessageBox>
 * )
 */
const ErrorMessageBox: React.FC<ErrorMessageBoxProps> = (props) => {
  const { children, title, testId } = props
  return (
    <MessageBox data-testid={testId} message={title}>
      <Text>
        {children}
      </Text>
    </MessageBox>
  )
}

const NoResourceError: React.FC<{resourceId: string}> = (props) => {
  const { resourceId } = props
  return (
    <MessageBox
      message="404 - PAGE NOT FOUND"
      data-testid="NoResourceError"
      variant="info"
      m="xxl"
    >
      <Text>
        Resource of given id:
        <b>{` ${resourceId} `}</b>
        cannot be found.
      </Text>
    </MessageBox>
  )
}

const NoActionError: React.FC<{resourceId: string; actionName: string}> = (props) => {
  const { resourceId, actionName } = props
  return (
    <MessageBox
      message="404 - PAGE NOT FOUND"
      data-testid="NoActionError"
      variant="info"
      m="xxl"
    >
      <Text>
        Resource:
        <b>{` ${resourceId} `}</b>
          does not have an action with name:
        <b>{` ${actionName} `}</b>
      </Text>
    </MessageBox>
  )
}

const NoRecordError: React.FC<{
  resourceId: string;
  recordId: string;
}> = (props) => {
  const { resourceId, recordId } = props
  return (
    <MessageBox
      message="404 - PAGE NOT FOUND"
      data-testid="NoRecordError"
      variant="info"
      m="xxl"
    >
      <Text>
        Resource:
        <b>{` ${resourceId} `}</b>
          does not have a record with id:
        <b>{` ${recordId} `}</b>
      </Text>
    </MessageBox>
  )
}

export {
  NoResourceError,
  NoActionError,
  NoRecordError,
  ErrorMessageBox as default,
}
