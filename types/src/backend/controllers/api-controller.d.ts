import { ActionContext, ActionRequest, RecordActionResponse, ActionResponse, BulkActionResponse } from '../actions/action.interface';
import { SearchActionResponse } from '../actions/search/search-action';
/**
 * Controller responsible for the auto-generated API: `/admin_root/api/...`, where
 * _admin_root_ is the `rootPath` given in {@link AdminJSOptions}.
 *
 * The best way to utilise it is to use {@link ApiClient} on the frontend.
 *
 * ### Available API endpoints
 *
 * <div class='table-container'>
 *
 * | Endpoint                 | Method                | Description |
 * |--------------------------|-----------------------|-------------|
 * | .../api/resources/{resourceId}/actions/{action} | {@link ApiController#resourceAction} | Perform customized resource action |
 * | .../api/resources/{resourceId}/records/{recordId}/{action} | {@link ApiController#recordAction} | Perform customized record action |
 * | .../api/resources/{resourceId}/bulk/{action}?recordIds={recordIds} | {@link ApiController#bulkAction} | Perform customized bulk action |
 * | .../api/pages/{pageName}_ | {@link ApiController#page} | Perform customized page action |
 * | .../api/dashboard_ | {@link ApiController#dashboard} | Perform customized dashboard action |
 *
 * </div>
 *
 * ### Responsibility
 *
 * In general this controllers takes handler functions you define in {@link AdminJSOptions} and:
 * - find all the [context information]{@link ActionContext} which is needed by the action
 *   and is passed to the {@link Action#handler}, {@link Action#before} and {@link Action#after}
 * - checks if action can be invoked by particular user {@link Action#isAccessible}
 * - invokes {@link Action#before} and {@link Action#after} hooks
 *
 * You probably don't want to modify it, but you can call its methods by using {@link ApiClient}
 *
 * @hideconstructor
 */
declare class ApiController {
    private _admin;
    private currentAdmin;
    /**
     * @param {Object} options
     * @param {AdminJSOptions} options.admin
     * @param {CurrentAdmin} [currentAdmin]
     */
    constructor({ admin }: {
        admin: any;
    }, currentAdmin: any);
    /**
     * Returns context for given action
     * @private
     *
     * @param   {ActionRequest}  request  request object
     * @return  {Promise<ActionContext>} action context
     */
    getActionContext(request: ActionRequest): Promise<ActionContext>;
    /**
     * Search records by query string.
     *
     * Handler function responsible for a _.../api/resources/{resourceId}/search/{query}_ route
     *
     * @param   {ActionRequest}  request with __params.query__ set
     * @param   {any}            response
     *
     * @return  {Promise<SearchActionResponse>}    found records
     */
    search(request: ActionRequest, response: any): Promise<SearchActionResponse>;
    /**
     * Performs a customized {@link Action resource action}.
     * To call it use {@link ApiClient#resourceAction} method.
     *
     * Handler function responsible for a _.../api/resources/{resourceId}/actions/{action}_
     *
     * @param   {ActionRequest}  originalRequest
     * @param   {any}            response object from the plugin (i.e. adminjs-expressjs)
     *
     * @return  {Promise<ActionResponse>}  action response
     */
    resourceAction(originalRequest: ActionRequest, response: any): Promise<ActionResponse>;
    /**
     * Performs a customized {@link Action record action}.
     * To call it use {@link ApiClient#recordAction} method.
     *
     * Handler function responsible for a _.../api/resources/{resourceId}/records/{recordId}/{action}_
     *
     * @param   {ActionRequest}  originalRequest
     * @param   {any}  response
     *
     * @return  {Promise<RecordActionResponse>}  action response
     * @throws  ConfigurationError      When given record action doesn't return {@link RecordJSON}
     * @throws  ConfigurationError      when action handler doesn't return Promise<{@link RecordActionResponse}>
     */
    recordAction(originalRequest: ActionRequest, response: any): Promise<RecordActionResponse>;
    /**
     * Performs a customized {@link Action bulk action}.
     * To call it use {@link ApiClient#bulkAction} method.
     *
     * Handler function responsible for a _.../api/resources/{resourceId}/bulk/{action}?recordIds={recordIds}_
     *
     * @param   {ActionRequest}  request
     * @param   {any}  response
     *
     * @return  {Promise<BulkActionResponse>}  action response
     * @throws  NotFoundError           when recordIds are missing in query or they don't exists in
     *                                  the database
     * @throws  ConfigurationError      when action handler doesn't return Promise<{@link BulkActionResponse}>
     */
    bulkAction(originalRequest: ActionRequest, response: any): Promise<BulkActionResponse>;
    /**
     * Gets optional data needed by the dashboard.
     * To call it use {@link ApiClient#getDashboard} method.
     *
     * Handler function responsible for a _.../api/dashboard_
     *
     * @param   {ActionRequest}  request
     * @param   {any}  response
     *
     * @return  {Promise<any>}  action response
     */
    dashboard(request: any, response: any): Promise<any>;
    /**
     * Gets optional data needed by the page.
     * To call it use {@link ApiClient#getPage} method.
     *
     * Handler function responsible for a _.../api/pages/{pageName}_
     *
     * @param   {ActionRequest}  request
     * @param   {any}  response
     *
     * @return  {Promise<any>}  action response
     */
    page(request: any, response: any): Promise<any>;
}
export default ApiController;
