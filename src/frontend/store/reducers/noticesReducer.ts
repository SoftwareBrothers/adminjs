import { TOptions } from 'i18next'
import { NoticeMessage } from '../../hoc/with-notice.js'
import { ADD_NOTICE } from '../actions/add-notice.js'
import { DROP_NOTICE } from '../actions/drop-notice.js'
import { SET_NOTICE_PROGRESS } from '../actions/set-notice-progress.js'

export type NoticeMessageInState = NoticeMessage & {
  message: string
  id: string
  type: NoticeMessage['type']
  progress: number
  options?: TOptions
  resourceId?: string
}

export type NoticesInState = Array<NoticeMessageInState>

type NoticeArgs = { noticeId: string; progress: number }
export const noticesReducer = (
  state: NoticesInState = [],
  action: {
    type: string
    data: NoticeMessageInState | NoticeArgs
  },
): NoticesInState => {
  switch (action.type) {
  case ADD_NOTICE: {
    const notices = [action.data as NoticeMessageInState]
    return notices
  }
  case DROP_NOTICE: {
    return state.filter((notice) => notice.id !== (action.data as NoticeArgs).noticeId)
  }
  case SET_NOTICE_PROGRESS: {
    return state.map((notice) => ({
      ...notice,
      progress:
          notice.id === (action.data as NoticeArgs).noticeId
            ? action.data.progress
            : notice.progress,
    }))
  }
  default:
    return state
  }
}
