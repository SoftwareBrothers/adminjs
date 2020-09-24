import React, { ReactNode } from 'react'
import { MessageBox, Text } from '@admin-bro/design-system'
import { useTranslation } from '../../hooks'

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
 * @private
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
  const { translateMessage } = useTranslation()
  return (
    <MessageBox
      message="404 - PAGE NOT FOUND"
      data-testid="NoResourceError"
      variant="info"
      m="xxl"
    >
      <Text>
        {translateMessage('error404Resource', resourceId, { resourceId })}
      </Text>
    </MessageBox>
  )
}

const NoActionError: React.FC<{resourceId: string; actionName: string}> = (props) => {
  const { resourceId, actionName } = props
  const { translateMessage } = useTranslation()
  return (
    <MessageBox
      message="404 - PAGE NOT FOUND"
      data-testid="NoActionError"
      variant="info"
      m="xxl"
    >
      <Text>
        {translateMessage('error404Action', resourceId, { resourceId, actionName })}
      </Text>
    </MessageBox>
  )
}

const NoRecordError: React.FC<{
  resourceId: string;
  recordId: string;
}> = (props) => {
  const { resourceId, recordId } = props
  const { translateMessage } = useTranslation()
  return (
    <MessageBox
      message="404 - PAGE NOT FOUND"
      data-testid="NoRecordError"
      variant="info"
      m="xxl"
    >
      <Text>
        {translateMessage('error404Record', resourceId, { resourceId, recordId })}
      </Text>
    </MessageBox>
  )
}

export {
  NoResourceError,
  NoActionError,
  NoRecordError,
  ErrorMessageBox,
  ErrorMessageBox as default,
}
