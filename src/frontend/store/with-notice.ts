import { connect } from 'react-redux'
import { addNotice, NoticeMessage } from './store'

export type AddNoticeProps = {
  addNotice: (notice: NoticeMessage) => void;
}

const mapDispatchToProps = (dispatch): AddNoticeProps => ({
  addNotice: (notice: NoticeMessage): void => dispatch(addNotice(notice)),
})

const withNotice = Component => connect(null, mapDispatchToProps)(Component)

export default withNotice
