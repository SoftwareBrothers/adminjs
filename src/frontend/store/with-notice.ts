import { connect } from 'react-redux'
import { ComponentType } from 'react'
import { addNotice, NoticeMessage } from './store'

export type AddNoticeProps = {
  addNotice: (notice: NoticeMessage) => void;
}

const mapDispatchToProps = (dispatch): AddNoticeProps => ({
  addNotice: (notice: NoticeMessage): void => dispatch(addNotice(notice)),
})

export default function withNotice<Props>(Component: ComponentType) {
  return connect<{}, AddNoticeProps, Props>(null, mapDispatchToProps)(Component)
}
