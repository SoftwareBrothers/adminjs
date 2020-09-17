export const DROP_NOTICE = 'DROP_NOTICE'

export const dropNotice = (noticeId: string) => ({
  type: 'DROP_NOTICE',
  data: { noticeId },
})
