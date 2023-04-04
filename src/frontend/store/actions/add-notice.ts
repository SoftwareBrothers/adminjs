import type { NoticeMessage } from '../../hoc/with-notice.js'
import type { NoticeMessageInState } from '../reducers/noticesReducer.js'

export const ADD_NOTICE = 'ADD_NOTICE'

export type AddNoticeResponse = {
  type: typeof ADD_NOTICE
  data: NoticeMessageInState
}

export const addNotice = (data: NoticeMessage = { message: '' }): AddNoticeResponse => ({
  type: ADD_NOTICE,
  data: {
    message: data.message,
    id: Math.random().toString(36).substr(2, 9),
    type: data.type || 'success',
    progress: 0,
    options: data.options,
    resourceId: data.resourceId,
  },
})
