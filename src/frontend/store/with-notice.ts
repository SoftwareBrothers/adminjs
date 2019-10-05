import { connect } from 'react-redux'
import { ComponentType } from 'react'
import { addNotice } from './store'

export type AddNoticeProps = {
  addNotice: typeof addNotice;
}

const mapDispatchToProps = (dispatch): AddNoticeProps => ({
  addNotice: notice => dispatch(addNotice(notice)),
})

export default function withNotice<Props>(Component: ComponentType) {
  return connect<{}, AddNoticeProps, Props>(null, mapDispatchToProps)(Component)
}
