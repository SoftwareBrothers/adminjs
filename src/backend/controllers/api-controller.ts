/* eslint-disable max-len */
/* eslint no-unused-vars: 0 */
import populator from '../utils/populator'
import Filter from '../utils/filter'
import ViewHelpers from '../utils/view-helpers'
import ForbiddenError from '../utils/forbidden-error'
import { CurrentAdmin } from '../../current-admin.interface'
import AdminBro from '../../admin-bro'
import { ActionContext, ActionRequest, RecordActionResponse, ActionResponse, BulkActionResponse } from '../actions/action.interface'
import ConfigurationError from '../utils/configuration-error'
import NotFoundError from '../utils/not-found-error'
import RecordJSON from '../decorators/record-json.interface'

/**
 * Controller responsible for the auto-generated API: `/admin_root/api/...`, where
 * _admin_root_ is the `rootPath` given in {@link AdminBroOptions}.
 *
 * The best way to utilise it is to use {@link ApiClient} on the frontend.
 *
 * ### Available API endpoints
 *
 * | Endpoint                 | Method                | Description |
 * |--------------------------|-----------------------|-------------|
 * | .../api/resources/{resourceId}/search/{query} | {@link ApiController#search} | Search record by query string |
 * | .../api/resources/{resourceId}/actions/{action} | {@link ApiController#resourceAction} | Perform customized resource action |
 * | .../api/resources/{resourceId}/records/{recordId}/{action} | {@link ApiController#recordAction} | Perform customized record action |
 * | .../api/resources/{resourceId}/bulk/{action}?recordIds={recordIds} | {@link ApiController#bulkAction} | Perform customized bulk action |
 * | .../api/pages/{pageName}_ | {@link ApiController#page} | Perform customized page action |
 * | .../api/dashboard_ | {@link ApiController#dashboard} | Perform customized dashboard action |
 *
 * ### Responsibility
 *
 * In general this controllers takes handler functions you define in {@link AdminBroOptions} and:
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
  private _admin: AdminBro

  private currentAdmin: CurrentAdmin

  /**
   * @param {Object} options
   * @param {AdminBroOptions} options.admin
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
      resource, action, h, currentAdmin: this.currentAdmin, _admin: this._admin,
    }
  }

  /**
   * Search records by query string.
   *
   * Handler function responsible for a _.../api/resources/{resourceId}/search/{query}_ route
   *
   * @param   {ActionRequest}  request with __params.query__ set
   *
   * @return  {Promise<SearchResponse>}    found records
   */
  async search(request: ActionRequest): Promise<SearchResponse> {
    const queryString = request.params && request.params.query
    const resource = this._admin.findResource(request.params.resourceId)
    const decorated = resource.decorate()
    if (!decorated.actions.list.isAccessible(this.currentAdmin)) {
      throw new ForbiddenError({ actionName: 'list', resourceId: resource.id() })
    }
    const titlePropertyName = decorated.titleProperty().name()

    const filters = queryString ? { [titlePropertyName]: queryString } : {}
    const filter = new Filter(filters, resource)

    const records = await resource.find(filter, {
      limit: 50,
      sort: {
        sortBy: titlePropertyName,
        direction: 'asc',
      },
    })

    return {
      records: records.map(record => record.toJSON(this.currentAdmin)),
    }
  }

  /**
   * Performs a customized {@link Action resource action}.
   * To call it use {@link ApiClient#resourceAction} method.
   *
   * Handler function responsible for a _.../api/resources/{resourceId}/actions/{action}_
   *
   * @param   {ActionRequest}  request
   * @param   {object}         response object from the plugin (i.e. admin-bro-expressjs)
   *
   * @return  {Promise<ActionResponse>}  action response
   */
  async resourceAction(request: ActionRequest, response: any): Promise<ActionResponse> {
    const actionContext = await this.getActionContext(request)
    if (!actionContext.action.isAccessible(this.currentAdmin)) {
      throw new ForbiddenError({
        actionName: actionContext.action.name,
        resourceId: actionContext.resource.id(),
      })
    }
    return actionContext.action.handler(request, response, actionContext)
  }

  /**
   * Performs a customized {@link Action record action}.
   * To call it use {@link ApiClient#recordAction} method.
   *
   * Handler function responsible for a _.../api/resources/{resourceId}/records/{recordId}/{action}_
   *
   * @param   {ActionRequest}  request
   * @param   {any}  response
   *
   * @return  {Promise<RecordActionResponse>}  action response
   * @throws  ConfigurationError      When given record action doesn't return {@link RecordJSON}
   * @throws  ForbiddenError          When user cannot perform given action: {@link Action#isAccessible}
   *                                  returns false
   * @throws  ConfigurationError      when action handler doesn't return Promise<{@link RecordActionResponse}>
   */
  async recordAction(request: ActionRequest, response: any): Promise<RecordActionResponse> {
    const { recordId, resourceId } = request.params
    const actionContext = await this.getActionContext(request)

    if (!recordId) {
      throw new NotFoundError([
        'You have to pass recordId to the recordAction',
      ].join('\n'), 'Action#handler')
    }

    let record = await actionContext.resource.findOne(recordId)

    if (!record) {
      throw new NotFoundError([
        `record with given id: "${recordId}" cannot be found in resource "${resourceId}"`,
      ].join('\n'), 'Action#handler')
    }
    [record] = await populator([record])

    if (!actionContext.action.isAccessible(this.currentAdmin, record)) {
      throw new ForbiddenError({
        actionName: actionContext.action.name,
        resourceId: actionContext.resource.id(),
      })
    }
    const jsonWithRecord = await actionContext.action.handler(request, response, { ...actionContext, record })

    if (jsonWithRecord && jsonWithRecord.record && jsonWithRecord.record.recordActions) {
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
   * @throws  ForbiddenError          When user cannot perform given action. {@link Action#isAccessible}
   *                                  returns false
   * @throws  ConfigurationError      when action handler doesn't return Promise<{@link BulkActionResponse}>
   */
  async bulkAction(request: ActionRequest, response: any): Promise<BulkActionResponse> {
    const { resourceId } = request.params
    const { recordIds } = request.query || {}
    const actionContext = await this.getActionContext(request)

    if (!recordIds) {
      throw new NotFoundError([
        'You have to pass "recordIds" to the bulkAction via search params: ?recordIds=...',
      ].join('\n'), 'Action#handler')
    }

    let records = await actionContext.resource.findMany(recordIds.split(','))

    if (!records || !records.length) {
      throw new NotFoundError([
        `record with given id: "${recordIds}" cannot be found in resource "${resourceId}"`,
      ].join('\n'), 'Action#handler')
    }
    records = await populator(records)
    records.forEach((record) => {
      if (!actionContext.action.isAccessible(this.currentAdmin, record)) {
        throw new ForbiddenError({
          actionName: actionContext.action.name,
          resourceId: actionContext.resource.id(),
        })
      }
    })
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
        'function in AdminBro options',
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
    const { pages } = this._admin.options
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
        'function in AdminBro options',
      ].join('\n'),
    }
  }
}

export default ApiController

/**
 * Response of a [Search]{@link ApiController#search} action in the API
 * @memberof ApiController
 * @alias SearchResponse
 */
export type SearchResponse = {
  /**
   * List of records
   */
  records: Array<RecordJSON>;
}
