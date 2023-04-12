import { type MessageBoxProps } from '@adminjs/design-system'
import { type TOptions } from 'i18next'

/**
 * NoticeMessage which can be presented as a "Toast" message.
 * @alias NoticeMessage
 */
export type NoticeMessage = {
  message: string
  // Extra 'error' to handle backwards. Error is replaced to danger in notification box
  type?: MessageBoxProps['variant'] | 'error'
  options?: TOptions
  resourceId?: string
}
