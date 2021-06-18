import { useDispatch } from 'react-redux'
import { addNotice } from '../store/actions/add-notice'
import { NoticeMessage } from '../hoc/with-notice'

/**
 * @memberof useNotice
 * @alias AddNotice
 */
export type AddNotice = (notice: NoticeMessage) => any;

/**
 * @classdesc
 * Hook which allows you to add notice message to the app.
 *
 * ```javascript
 * import { useNotice, Button } from 'adminjs'
 *
 * const myComponent = () => {
 *   const sendNotice = useNotice()
 *   render (
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
  return (notice): any => dispatch(addNotice(notice))
}

export default useNotice
