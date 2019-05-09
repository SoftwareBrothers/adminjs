import { connect } from 'react-redux'
import { addNotice } from './store'

const mapDispatchToProps = dispatch => ({
  addNotice: notice => dispatch(addNotice(notice)),
})

export default connect(null, mapDispatchToProps)
