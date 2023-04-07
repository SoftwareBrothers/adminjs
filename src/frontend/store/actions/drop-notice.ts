export const DROP_NOTICE = 'DROP_NOTICE'

export type DropNoticeResponse = {
  type: typeof DROP_NOTICE
  data: {
    noticeId: string
  }
}

export const dropNotice = (noticeId: string): DropNoticeResponse => ({
  type: 'DROP_NOTICE',
  data: { noticeId },
})
