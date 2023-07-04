import React, { ReactNode } from 'react'
import { InfoBox, MessageBox, Text } from '@adminjs/design-system'

import { useTranslation } from '../../hooks/index.js'

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

const NoResourceError: React.FC<{ resourceId: string }> = (props) => {
  const { resourceId } = props
  const { translateMessage } = useTranslation()
  return (
    <InfoBox
      title={translateMessage('pageNotFound_title', resourceId, { resourceId })}
      illustration="NotFound"
      testId="NoResourceError"
    >
      <Text>
        {translateMessage('error404Resource', resourceId, { resourceId })}
      </Text>
    </InfoBox>
  )
}

const NoActionError: React.FC<{ resourceId: string; actionName: string }> = (props) => {
  const { resourceId, actionName } = props
  const { translateMessage } = useTranslation()
  return (
    <InfoBox
      title={translateMessage('pageNotFound_title', resourceId, { resourceId })}
      illustration="NotFound"
      testId="NoActionError"
    >
      <Text>
        {translateMessage('error404Action', resourceId, { resourceId, actionName })}
      </Text>
    </InfoBox>
  )
}

const NoRecordError: React.FC<{
  resourceId: string;
  recordId: string;
}> = (props) => {
  const { resourceId, recordId } = props
  const { translateMessage } = useTranslation()
  return (
    <InfoBox
      title={translateMessage('pageNotFound_title', resourceId, { resourceId })}
      illustration="NotFound"
      testId="NoRecordError"
    >
      <Text>
        {translateMessage('error404Record', resourceId, { resourceId, recordId })}
      </Text>
    </InfoBox>
  )
}

export {
  NoResourceError,
  NoActionError,
  NoRecordError,
  ErrorMessageBox,
  ErrorMessageBox as default,
}
