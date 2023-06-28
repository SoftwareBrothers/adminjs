import { Box, MessageBox, MessageBoxProps } from '@adminjs/design-system'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'

import allowOverride from '../../hoc/allow-override.js'
import { useTranslation } from '../../hooks/index.js'
import { dropNotice } from '../../store/actions/drop-notice.js'
import { SetNoticeProgress, setNoticeProgress } from '../../store/actions/set-notice-progress.js'
import { ReduxState, type NoticeMessageInState } from '../../store/index.js'

const TIME_TO_DISAPPEAR = 3

export type NotifyProgress = (options: SetNoticeProgress) => void

export type NoticeElementProps = {
  notice: NoticeMessageInState
  drop: () => void
  notifyProgress: NotifyProgress
}

export type NoticeElementState = {
  progress: number
}

const NoticeElement: React.FC<NoticeElementProps> = (props) => {
  const { drop, notice, notifyProgress } = props
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<number>()
  const {
    tm,
    i18n: { language },
  } = useTranslation()
  const message = useMemo(
    () => tm(notice.message, notice.resourceId, notice.options),
    [notice.id, language],
  )
  const variant: MessageBoxProps['variant'] = notice.type === 'error' ? 'danger' : notice.type ?? 'info'

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const _progress = progress + 100 / TIME_TO_DISAPPEAR
      notifyProgress({ noticeId: notice.id, progress })
      setProgress(_progress)
      return _progress
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [notice])

  useEffect(() => {
    if (progress >= 100) {
      drop()
    }
  }, [drop, progress])

  return (
    <MessageBox
      style={{ minWidth: '480px' }}
      message={message}
      variant={variant}
      onCloseClick={drop}
    >
      {notice.body}
    </MessageBox>
  )
}

type NoticeBoxPropsFromState = {
  notices: Array<NoticeMessageInState>
}

type NoticeBoxDispatchFromState = {
  drop: (noticeId: string) => void
  notifyProgress: NotifyProgress
}

const NoticeBox: React.FC<NoticeBoxPropsFromState & NoticeBoxDispatchFromState> = (props) => {
  const { drop, notices, notifyProgress } = props
  if (!notices.length) return null

  return (
    <Box
      as="div"
      data-testid="notice-wrapper"
      data-css="notice-wrapper"
      flex
      flexDirection="column"
      p="sm"
      style={{ gap: 4 }}
    >
      {notices.map((notice) => (
        <NoticeElement
          key={notice.id}
          notice={notice}
          drop={() => drop(notice.id)}
          notifyProgress={notifyProgress}
        />
      ))}
    </Box>
  )
}

const mapStateToProps = (state: ReduxState): NoticeBoxPropsFromState => ({
  notices: state.notices,
})

const mapDispatchToProps = (dispatch): NoticeBoxDispatchFromState => ({
  drop: (noticeId: string): void => dispatch(dropNotice(noticeId)),
  notifyProgress: ({ noticeId, progress }) => dispatch(setNoticeProgress({ noticeId, progress })),
})

const ConnectedNoticeBox = connect(mapStateToProps, mapDispatchToProps)(NoticeBox)
const OverridableConnectedNoticeBox = allowOverride(ConnectedNoticeBox, 'NoticeBox')

export {
  OverridableConnectedNoticeBox as NoticeBox,
  OverridableConnectedNoticeBox as default,
  ConnectedNoticeBox as OriginalNoticeBox,
}
