import { useDispatch } from 'react-redux'

import { type NoticeMessage } from '../interfaces/noticeMessage.interface.js'
import { addNotice, type AddNoticeResponse } from '../store/actions/add-notice.js'

/**
 * @memberof useNotice
 * @alias AddNotice
 */
export type AddNotice = (notice: NoticeMessage) => AddNoticeResponse

/**
 * @classdesc
 * Hook which allows you to add notice message to the app.
 *
 * ```javascript
 * import { useNotice, Button } from 'adminjs'
 *
 * const myComponent = () => {
 *   const sendNotice = useNotice()
 *   return (
 *     <Button onClick={() => sendNotice({ message: 'I am awesome' })}>I am awesome</Button>
 *   )
 * }
 * ```
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @hideconstructor
 */
export const useNotice = (): AddNotice => {
  const dispatch = useDispatch()
  return (notice) => dispatch(addNotice(notice))
}

export default useNotice
