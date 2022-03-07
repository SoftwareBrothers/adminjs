import { NoticeMessage } from '../hoc/with-notice';
/**
 * @memberof useNotice
 * @alias AddNotice
 */
export declare type AddNotice = (notice: NoticeMessage) => any;
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
export declare const useNotice: () => AddNotice;
export default useNotice;
