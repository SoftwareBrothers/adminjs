import { Action, RecordActionResponse } from '../action.interface';
/**
 * @implements Action
 * @category Actions
 * @module DeleteAction
 * @description
 * Removes given record from the database. Since it doesn't have a
 * component - it redirects right away after clicking its {@link ActionButton}
 * @private
 */
export declare const DeleteAction: Action<RecordActionResponse>;
export default DeleteAction;
