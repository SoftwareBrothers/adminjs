import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import { MessageBox } from '@adminjs/design-system'

import { NoticeMessageInState, ReduxState } from '../../store/store'
import { dropNotice } from '../../store/actions/drop-notice'
import { setNoticeProgress } from '../../store/actions/set-notice-progress'

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

export class NoticeElement extends React.Component<NoticeElementProps, NoticeElementState> {
  private timer: NodeJS.Timeout | null

  constructor(props) {
    super(props)
    const { notice } = props
    this.timer = null
    this.state = {
      progress: notice.progress || 0,
    }
  }

  componentDidMount(): void {
    const { drop, notice, notifyProgress } = this.props

    this.timer = setInterval(() => {
      this.setState((state) => {
        const progress = state.progress + 100 / TIME_TO_DISAPPEAR
        notifyProgress({ noticeId: notice.id, progress })
        return { progress }
      })
    }, 1000)

    setTimeout(() => {
      if (this.timer) {
        clearInterval(this.timer)
      }
      drop()
    }, 1000 * (TIME_TO_DISAPPEAR + 1))
  }

  componentWillUnmount(): void {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  render(): ReactNode {
    const { notice, drop } = this.props
    return (
      <MessageBox
        style={{ minWidth: '480px' }}
        message={notice.message}
        variant={notice.type === 'success' ? 'success' : 'danger'}
        onCloseClick={drop}
      />
    )
  }
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
      <div data-testid="notice-wrapper">
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

const ConnectedNoticeBox = connect(
  mapStateToProps, mapDispatchToProps,
)(NoticeBox)

export {
  ConnectedNoticeBox as default,
  ConnectedNoticeBox as NoticeBox,
}
