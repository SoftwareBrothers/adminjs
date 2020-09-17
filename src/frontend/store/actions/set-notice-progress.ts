
export const SET_NOTICE_PROGRESS = 'SET_NOTICE_PROGRESS'

export const setNoticeProgress = ({ noticeId, progress }: {
  noticeId: string;
  progress: number;
}) => ({
  type: SET_NOTICE_PROGRESS,
  data: { noticeId, progress },
})
