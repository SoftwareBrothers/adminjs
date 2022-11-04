import { RecordActionParams, BulkActionParams, ResourceActionParams } from '../../../../backend/utils/view-helpers/view-helpers';
declare type AnyActionParams = RecordActionParams & ResourceActionParams & BulkActionParams;
/**
 * Indicates if route action should be updated, meaning whether it should fetch
 * new data from the backend.
 * @private
 *
 * @param {AnyActionParams} currentMatchParams
 * @param {AnyActionParams} newMatchParams
 * @return  {boolean}
 */
declare const shouldActionReFetchData: (currentMatchParams: Partial<AnyActionParams>, newMatchParams: Partial<AnyActionParams>) => boolean;
export default shouldActionReFetchData;
