/* eslint-disable max-len */
/* eslint no-unused-vars: 0 */
import populator from '../utils/populator/populator.js'
import ViewHelpers from '../utils/view-helpers/view-helpers.js'
import { CurrentAdmin } from '../../current-admin.interface.js'
import AdminJS from '../../adminjs.js'
import { ActionContext, ActionRequest, RecordActionResponse, ActionResponse, BulkActionResponse } from '../actions/action.interface.js'
import ConfigurationError from '../utils/errors/configuration-error.js'
import NotFoundError from '../utils/errors/not-found-error.js'
import ForbiddenError from '../utils/errors/forbidden-error.js'
import { requestParser } from '../utils/request-parser/index.js'
import { SearchActionResponse } from '../actions/search/search-action.js'
import actionErrorHandler from '../services/action-error-handler/action-error-handler.js'
import { validateParam } from '../../utils/param-converter/validate-param.js'
import { DecoratedProperties } from '../decorators/resource/utils/decorate-properties.js'

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
class ApiController {
  private _admin: AdminJS

  private currentAdmin: CurrentAdmin

  /**
   * @param {Object} options
   * @param {AdminJSOptions} options.admin
   * @param {CurrentAdmin} [currentAdmin]
   */
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.currentAdmin = currentAdmin
  }

  /**
   * Returns context for given action
   * @private
   *
   * @param   {ActionRequest}  request  request object
   * @return  {Promise<ActionContext>} action context
   */
  async getActionContext(request: ActionRequest): Promise<ActionContext> {
    const { resourceId, action: actionName } = request.params
    const h = new ViewHelpers(this._admin)
    const resource = this._admin.findResource(resourceId)
    const action = resource.decorate().actions[actionName]
    return {
      resource,
      action,
      h,
      currentAdmin: this.currentAdmin,
      _admin: this._admin,
    }
  }

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
  async search(request: ActionRequest, response): Promise<SearchActionResponse> {
    request.params.action = 'search'
    // eslint-disable-next-line no-console
    console.log([
      'Using ApiController#search is deprecated in favour of resourceAction',
      'It will be removed in the next version',
    ].join('\n'))
    return this.resourceAction(request, response) as Promise<SearchActionResponse>
  }

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
  async resourceAction(originalRequest: ActionRequest, response: any): Promise<ActionResponse> {
    const actionContext = await this.getActionContext(originalRequest)
    const request = requestParser(originalRequest, actionContext.resource)
    return actionContext.action.handler(request, response, actionContext)
  }

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
  async recordAction(originalRequest: ActionRequest, response: any): Promise<RecordActionResponse> {
    const { recordId, resourceId } = originalRequest.params
    const actionContext = await this.getActionContext(originalRequest)
    const request = requestParser(originalRequest, actionContext.resource)

    if (!recordId) {
      throw new NotFoundError([
        'You have to pass recordId to the recordAction',
      ].join('\n'), 'Action#handler')
    }

    const idProperty = Object.values(actionContext.resource.decorate()?.properties as DecoratedProperties)
      .find((p) => p.isId())
    if (!idProperty || !validateParam(recordId, idProperty)) {
      const invalidRecordError = actionErrorHandler(
        new ForbiddenError([
          'You have to pass a valid recordId to the recordAction',
        ].join('\n')),
        actionContext,
      )

      return invalidRecordError as RecordActionResponse
    }

    let record = await actionContext.resource.findOne(recordId, actionContext)

    if (!record) {
      const missingRecordError = actionErrorHandler(
        new NotFoundError([
          `Record with given id: "${recordId}" cannot be found in resource "${resourceId}"`,
        ].join('\n'), 'Action#handler'),
        actionContext,
      )

      return missingRecordError as RecordActionResponse
    }

    [record] = await populator([record], actionContext)

    actionContext.record = record
    const jsonWithRecord = await actionContext.action.handler(request, response, actionContext)

    const isValidRecord = !!(jsonWithRecord && jsonWithRecord.record && jsonWithRecord.record.recordActions)
    const anErrorWasHandled = jsonWithRecord && jsonWithRecord.notice && jsonWithRecord.notice.type === 'error'

    if (isValidRecord || anErrorWasHandled) {
      return jsonWithRecord
    }

    throw new ConfigurationError(
      'handler of a recordAction should return a RecordJSON object',
      'Action#handler',
    )
  }

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
  async bulkAction(originalRequest: ActionRequest, response: any): Promise<BulkActionResponse> {
    const { resourceId } = originalRequest.params
    const { recordIds } = originalRequest.query || {}
    const actionContext = await this.getActionContext(originalRequest)
    const request = requestParser(originalRequest, actionContext.resource)

    if (!recordIds) {
      throw new NotFoundError([
        'You have to pass "recordIds" to the bulkAction via search params: ?recordIds=...',
      ].join('\n'), 'Action#handler')
    }

    let records = await actionContext.resource.findMany(recordIds.split(','), actionContext)

    if (!records || !records.length) {
      throw new NotFoundError([
        `record with given id: "${recordIds}" cannot be found in resource "${resourceId}"`,
      ].join('\n'), 'Action#handler')
    }
    records = await populator(records, actionContext)
    const jsonWithRecord = await actionContext.action.handler(request, response, { ...actionContext, records })

    if (jsonWithRecord && jsonWithRecord.records) {
      return jsonWithRecord
    }
    throw new ConfigurationError(
      'handler of a bulkAction should return an Array of RecordJSON object',
      'Action#handler',
    )
  }

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
  async dashboard(request: any, response: any): Promise<any> {
    const h = new ViewHelpers(this._admin)
    const handler = this._admin.options.dashboard && this._admin.options.dashboard.handler
    if (handler) {
      return handler(request, response, {
        h,
        currentAdmin: this.currentAdmin,
        _admin: this._admin,
      })
    }
    return {
      message: [
        'You can override this method by setting up dashboard.handler',
        'function in AdminJS options',
      ].join('\n'),
    }
  }

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
  async page(request: any, response: any): Promise<any> {
    const h = new ViewHelpers(this._admin)
    const { pages = {} } = this._admin.options

    const { pageName } = request.params
    const { handler } = (pages[pageName] || {})

    if (handler) {
      return handler(request, response, {
        h,
        currentAdmin: this.currentAdmin,
        _admin: this._admin,
      })
    }
    return {
      message: [
        'You can override this method by setting up pages[pageName].handler',
        'function in AdminJS options',
      ].join('\n'),
    }
  }
}

export default ApiController
