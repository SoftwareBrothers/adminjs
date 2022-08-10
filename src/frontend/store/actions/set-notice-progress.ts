export const SET_NOTICE_PROGRESS = 'SET_NOTICE_PROGRESS'

export type SetNoticeProgress = {
  noticeId: string;
  progress: number;
}

export type SetNoticeProgressResponse = {
  type: typeof SET_NOTICE_PROGRESS;
  data: SetNoticeProgress;
}

export const setNoticeProgress = (data: SetNoticeProgress): SetNoticeProgressResponse => ({
  type: SET_NOTICE_PROGRESS,
  data,
})
