import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { dropNotice, setNoticeProgress } from '../../store/store'
import { noticeType } from '../../types'

const TIME_TO_DISAPPEAR = 10

const NoticeWrapper = styled.div.attrs({
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
  padding: 13px ${({ theme }) => theme.sizes.paddingLayout};

  &:not(:last-child) {
    margin-bottom: 0;
  }

  &.success {
    background-color: ${({ theme }) => theme.colors.lightSuccess};
    border-color: ${({ theme }) => theme.colors.success};

    & .progressBar {
      background-color: ${({ theme }) => theme.colors.success};
    }
  }

  &.error {
    background-color: ${({ theme }) => theme.colors.lightError};
    border-color: ${({ theme }) => theme.colors.error};
    & .delete:before, & .delete:after {
      background-color: ${({ theme }) => theme.colors.error};
    }
    & .progressBar {
      background-color: ${({ theme }) => theme.colors.error};
    }
  }

  & .delete {
    background: transparent;
    right: ${({ theme }) => theme.sizes.paddingLayout};
    top: ${({ theme }) => theme.sizes.padding};

    &:before, &:after {
      background-color: ${({ theme }) => theme.colors.success};
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
    const { drop, notice, notifyProgress } = this.props

    this.timer = setInterval(() => {
      this.setState((state) => {
        const progress = state.progress + 100 / TIME_TO_DISAPPEAR
        notifyProgress({ noticeId: notice.id, progress })
        return { progress }
      })
    }, 1000)

    setTimeout(() => {
      clearInterval(this.timer)
      drop()
    }, 1000 * (TIME_TO_DISAPPEAR + 1))
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
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

NoticeElement.propTypes = {
  notice: noticeType.isRequired,
  drop: PropTypes.func.isRequired,
  notifyProgress: PropTypes.func.isRequired,
}

const NoticeBox = (props) => {
  const { drop, notices, notifyProgress } = props
  const notice = notices.length ? notices[notices.length - 1] : null
  if (notice) {
    return (
      <NoticeElement
        key={notice.id}
        notice={notice}
        drop={() => drop(notice.id)}
        notifyProgress={notifyProgress}
      />
    )
  }
  return (
    <div />
  )
}

NoticeBox.propTypes = {
  notices: PropTypes.arrayOf(noticeType).isRequired,
  drop: PropTypes.func.isRequired,
  notifyProgress: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  notices: state.notices,
})

const mapDispatchToProps = dispatch => ({
  drop: noticeId => dispatch(dropNotice(noticeId)),
  notifyProgress: ({ noticeId, progress }) => dispatch(setNoticeProgress({ noticeId, progress })),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeBox)
