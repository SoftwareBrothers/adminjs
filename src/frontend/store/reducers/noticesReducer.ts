import { type NoticeMessage } from '../../interfaces/noticeMessage.interface.js'
import { ADD_NOTICE, AddNoticeResponse } from '../actions/add-notice.js'
import { DROP_NOTICE, DropNoticeResponse } from '../actions/drop-notice.js'
import { SET_NOTICE_PROGRESS, SetNoticeProgressResponse } from '../actions/set-notice-progress.js'

export interface NoticeMessageInState extends NoticeMessage {
  id: string
  progress: number
}

export type NoticesInState = Array<NoticeMessageInState>
type NoticeActionResponse = AddNoticeResponse | DropNoticeResponse | SetNoticeProgressResponse

export const noticesReducer = (
  state: NoticesInState = [],
  action: NoticeActionResponse,
): NoticesInState => {
  switch (action.type) {
  case ADD_NOTICE: {
    return [...state, action.data]
  }
  case DROP_NOTICE: {
    return state.filter((notice) => notice.id !== action.data.noticeId)
  }
  case SET_NOTICE_PROGRESS: {
    return state.map((notice) => ({
      ...notice,
      progress: notice.id === action.data.noticeId ? action.data.progress : notice.progress,
    }))
  }
  default:
    return state
  }
}
