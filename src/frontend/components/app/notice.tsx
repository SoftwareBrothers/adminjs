import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { MessageBox } from '@adminjs/design-system'

import { NoticeMessageInState, ReduxState } from '../../store/store'
import { dropNotice } from '../../store/actions/drop-notice'
import { setNoticeProgress } from '../../store/actions/set-notice-progress'
import allowOverride from '../../hoc/allow-override'
import { useTranslation } from '../../hooks'

const TIME_TO_DISAPPEAR = 3

export type NotifyProgress = (options: {
  noticeId: string; progress: number;
}) => void

export type NoticeElementProps = {
  notice: NoticeMessageInState;
  drop: () => any;
  notifyProgress: NotifyProgress;
}

export type NoticeElementState = {
  progress: number;
}

const NoticeElement: React.FC<NoticeElementProps> = (props) => {
  const { drop, notice, notifyProgress } = props
  const [progress, setProgress] = useState(0)
  const { translateMessage } = useTranslation()

  useEffect(() => {
    const timer = setInterval(() => {
      const _progress = progress + 100 / TIME_TO_DISAPPEAR
      notifyProgress({ noticeId: notice.id, progress })
      setProgress(_progress)
      return _progress
    }, 1000)
    setTimeout(() => {
      if (timer) {
        clearInterval(timer)
      }
      drop()
    }, 1000 * (TIME_TO_DISAPPEAR + 1))
  }, [notice])

  return (
    <MessageBox
      style={{ minWidth: '480px' }}
      message={translateMessage(notice.message)}
      variant={notice.type === 'success' ? 'success' : 'danger'}
      onCloseClick={drop}
    />
  )
}

type NoticeBoxPropsFromState = {
  notices: Array<NoticeMessageInState>;
}

type NoticeBoxDispatchFromState = {
  drop: (noticeId: string) => void;
  notifyProgress: NotifyProgress;
}

const NoticeBox: React.FC<NoticeBoxPropsFromState & NoticeBoxDispatchFromState> = (props) => {
  const { drop, notices, notifyProgress } = props
  const notice = notices.length ? notices[notices.length - 1] : null
  if (notice) {
    return (
      <div data-testid="notice-wrapper" data-css="notice-wrapper">
        <NoticeElement
          key={notice.id}
          notice={notice}
          drop={(): void => drop(notice.id)}
          notifyProgress={notifyProgress}
        />
      </div>
    )
  }
  return (
    <div />
  )
}

const mapStateToProps = (state: ReduxState): NoticeBoxPropsFromState => ({
  notices: state.notices,
})

const mapDispatchToProps = (dispatch): NoticeBoxDispatchFromState => ({
  drop: (noticeId: string): void => dispatch(dropNotice(noticeId)),
  notifyProgress: ({
    noticeId, progress,
  }): void => dispatch(setNoticeProgress({ noticeId, progress })),
})

const ConnectedNoticeBox = connect(mapStateToProps, mapDispatchToProps)(NoticeBox)
const OverridableConnectedNoticeBox = allowOverride(ConnectedNoticeBox, 'NoticeBox')

export {
  OverridableConnectedNoticeBox as default,
  OverridableConnectedNoticeBox as NoticeBox,
}
