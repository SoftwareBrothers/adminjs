import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { colors, sizes } from '../../styles/variables'
import { dropNotice, setNoticeProgress } from '../../store/store'

const TIME_TO_DISAPPEAR = 10

const NoticeWrapper = styled.div.attrs({
  className: 'notification',
})`
  &.success {
    background-color: ${colors.lightSuccess};
    border: 1px solid ${colors.success};

    & .progressBar {
      background-color: ${colors.success};
    }
  }

  &.error {
    background-color: ${colors.lightError};
    border: 1px solid ${colors.error};
    & .delete:before, & .delete:after {
      background-color: ${colors.error};
    }
    & .progressBar {
      background-color: ${colors.error};
    }
  }

  & .delete {
    background: transparent;
    right: ${sizes.padding};
    top: ${sizes.padding};

    &:before, &:after {
      background-color: ${colors.success};
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

class NoticeElement extends React.Component {
  constructor(props) {
    super(props)
    const { notice } = props
    this.state = {
      progress: notice.progress || 0,
    }
  }

  componentDidMount() {
    const { onDrop, notice, notifyProgress } = this.props

    this.timer = setInterval(() => {
      this.setState((state) => {
        const progress = state.progress + 100 / TIME_TO_DISAPPEAR
        notifyProgress({ noticeId: notice.id, progress })
        return { progress }
      })
    }, 1000)

    setTimeout(() => {
      clearInterval(this.timer)
      onDrop()
    }, 1000 * (TIME_TO_DISAPPEAR + 1))
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { notice, onDrop } = this.props
    const { progress } = this.state
    return (
      <NoticeWrapper className={notice.type}>
        <button className="delete" onClick={onDrop} type="button" />
        { notice.message }
        <div className="progressBar" style={{ width: `${progress}%` }} />
      </NoticeWrapper>
    )
  }
}

const NoticeBox = (props) => {
  const { drop, notices, notifyProgress } = props
  return (
    <React.Fragment>
      {notices && notices.map(notice => (
        <NoticeElement
          key={notice.id}
          notice={notice}
          onDrop={() => drop(notice.id)}
          notifyProgress={notifyProgress}
        />
      ))}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  notices: state.notices,
})

const mapDispatchToProps = dispatch => ({
  drop: noticeId => dispatch(dropNotice(noticeId)),
  notifyProgress: ({ noticeId, progress }) => dispatch(setNoticeProgress({ noticeId, progress })),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeBox)
