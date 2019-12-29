import { connect } from 'react-redux'
import { addNotice } from './store'

/**
 * NoticeMessage which can be presented as a Toast'like message.
 * @alias NoticeMessage
 * @memberof withNotice
 */
export type NoticeMessage = {
  message: string;
  type?: 'success' | 'error';
}


/**
 * Additional props which are passed to your component
 * @alias AddNoticeProps
 * @memberof withNotice
 */
export type AddNoticeProps = {
  // Function triggering notice messages
  addNotice: (notice: NoticeMessage) => void;
}


const mapDispatchToProps = (dispatch): AddNoticeProps => ({
  addNotice: (notice: NoticeMessage): void => dispatch(addNotice(notice)),
})

/**
 * HighOriderComponent which allows you to post notice messages from your components
 *
 * It gives you the additional prop: `addNotice(noticeMessage)` taking {@link NoticeMessage}.
 *
 * ```javascript
 * import { withNotice } from 'admin-bro'
 *
 * const MY_MESSAGE = {
 *   message: 'I am toast message',
 *   type: 'success',
 * }
 * const MyCustomComponent = ({ addNotice }) => {
 *   return (
 *     <a onClick={() => addNotice(MY_MESSAGE)}>Click Me</a>
 *   )
 * }
 * export default withNotice(MyCustomComponent)
 * ```
 *
 * @component
 */
const withNotice = Component => connect(null, mapDispatchToProps)(Component)

export default withNotice
