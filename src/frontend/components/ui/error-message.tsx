import React, { ReactNode } from 'react'
import { Box } from '../design-system/atoms/box'

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
    <Box data-testid={testId}>
      <div className="content has-text-centered">
        <h3>{title}</h3>
        <div>
          {children}
        </div>
      </div>
    </Box>
  )
}

const NoResourceError: React.FC<{resourceId: string}> = (props) => {
  const { resourceId } = props
  return (
    <ErrorMessageBox title="404 - PAGE NOT FOUND" testId="NoResourceError">
      Resource of given id:
      <b>{` ${resourceId} `}</b>
      cannot be found.
    </ErrorMessageBox>
  )
}

const NoActionError: React.FC<{resourceId: string; actionName: string}> = (props) => {
  const { resourceId, actionName } = props
  return (
    <ErrorMessageBox title="404 - PAGE NOT FOUND" testId="NoActionError">
        Resource:
      <b>{` ${resourceId} `}</b>
        does not have an action with name:
      <b>{` ${actionName} `}</b>
    </ErrorMessageBox>
  )
}

const NoRecordError: React.FC<{
  resourceId: string;
  recordId: string;
}> = (props) => {
  const { resourceId, recordId } = props
  return (
    <ErrorMessageBox title="404 - PAGE NOT FOUND" testId="NoRecordError">
        Resource:
      <b>{` ${resourceId} `}</b>
        does not have a record with id:
      <b>{` ${recordId} `}</b>
    </ErrorMessageBox>
  )
}

export {
  NoResourceError,
  NoActionError,
  NoRecordError,
  ErrorMessageBox as default,
}
