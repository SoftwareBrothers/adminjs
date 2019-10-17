import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { dropNotice, setNoticeProgress, NoticeMessageInState, ReduxState } from '../../store/store'

const TIME_TO_DISAPPEAR = 3

const NoticeWrapper = styled.div.attrs<{className: string}>({
  className: 'notification',
})`
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0;
  border-style: none none solid none;
  border-width: 1px;
  padding: 13px ${({ theme }): string => theme.sizes.paddingLayout};

  &:not(:last-child) {
    margin-bottom: 0;
  }

  &.success {
    background-color: ${({ theme }): string => theme.colors.lightSuccess};
    border-color: ${({ theme }): string => theme.colors.success};

    & .progressBar {
      background-color: ${({ theme }): string => theme.colors.success};
    }
  }

  &.error {
    background-color: ${({ theme }): string => theme.colors.lightError};
    border-color: ${({ theme }): string => theme.colors.error};
    & .delete:before, & .delete:after {
      background-color: ${({ theme }): string => theme.colors.error};
    }
    & .progressBar {
      background-color: ${({ theme }): string => theme.colors.error};
    }
  }

  & .delete {
    background: transparent;
    right: ${({ theme }): string => theme.sizes.paddingLayout};
    top: ${({ theme }): string => theme.sizes.padding};

    &:before, &:after {
      background-color: ${({ theme }): string => theme.colors.success};
    }

    &:after {
      height: 80%;
      width: 1px;
    }
    &:before {
      width: 80%;
      height: 1px;
    }
  }

  & .progressBar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: #fff;
    transition: width 1s linear;
  }
`

type NotifyProgress = (options: {
  noticeId: string; progress: number;
}) => void

type NoticeElementProps = {
  notice: NoticeMessageInState;
  drop: () => any;
  notifyProgress: NotifyProgress;
}

type NoticeElementState = {
  progress: number;
}

class NoticeElement extends React.Component<NoticeElementProps, NoticeElementState> {
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
    const { progress } = this.state
    return (
      <NoticeWrapper className={notice.type}>
        <button className="delete" onClick={drop} type="button" />
        { notice.message }
        <div className="progressBar" style={{ width: `${progress}%` }} />
      </NoticeWrapper>
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
      <NoticeElement
        key={notice.id}
        notice={notice}
        drop={(): void => drop(notice.id)}
        notifyProgress={notifyProgress}
      />
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

export default connect(
  mapStateToProps, mapDispatchToProps,
)(NoticeBox)
