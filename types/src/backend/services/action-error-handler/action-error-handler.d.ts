import { ActionContext, RecordActionResponse, BulkActionResponse } from '../../actions/action.interface';
/**
 * @private
 * @classdesc
 * Function which catches all the errors thrown by the action hooks or handler
 */
declare const actionErrorHandler: (error: Error, context: ActionContext) => RecordActionResponse | BulkActionResponse;
export default actionErrorHandler;
