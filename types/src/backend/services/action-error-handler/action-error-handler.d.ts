import { ActionContext, ActionResponse } from '../../actions/action.interface';
/**
 * @private
 * @classdesc
 * Function which catches all the errors thrown by the action hooks or handler
 */
declare const actionErrorHandler: (error: any, context: ActionContext) => ActionResponse;
export default actionErrorHandler;
