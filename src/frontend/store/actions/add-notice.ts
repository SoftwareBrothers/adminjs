import { type NoticeMessage } from '../../interfaces/noticeMessage.interface.js'
import { type NoticeMessageInState } from '../reducers/noticesReducer.js'

export const ADD_NOTICE = 'ADD_NOTICE'

export type AddNoticeResponse = {
  type: typeof ADD_NOTICE
  data: NoticeMessageInState
}

export const addNotice = (data: NoticeMessage): AddNoticeResponse => ({
  type: ADD_NOTICE,
  data: {
    id: `notice-${Date.now() + Math.random()}`,
    progress: 0,
    ...data,
  },
})
