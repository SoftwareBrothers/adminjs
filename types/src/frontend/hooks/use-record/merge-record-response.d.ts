import { RecordJSON } from '../../interfaces';
import { RecordActionResponse } from '../../../backend/actions/action.interface';
/**
 * Handlers of all [Actions]{@link Action} of type `record` returns record.
 * Depending on a place and response we have to merge what was returned
 * to the actual state. It is done in following places:
 * - {@link useRecord} hook
 * - {@link RecordInList} component
 * - {@link RecordAction} component
 *
 * @private
 */
declare const mergeRecordResponse: (record: RecordJSON, response: RecordActionResponse) => RecordJSON;
export default mergeRecordResponse;
