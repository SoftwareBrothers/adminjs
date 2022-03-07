"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _populator = _interopRequireDefault(require("../utils/populator/populator"));

var _viewHelpers = _interopRequireDefault(require("../utils/view-helpers/view-helpers"));

var _configurationError = _interopRequireDefault(require("../utils/errors/configuration-error"));

var _notFoundError = _interopRequireDefault(require("../utils/errors/not-found-error"));

var _requestParser = require("../utils/request-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  /**
   * @param {Object} options
   * @param {AdminJSOptions} options.admin
   * @param {CurrentAdmin} [currentAdmin]
   */
  constructor({
    admin
  }, currentAdmin) {
    this._admin = admin;
    this.currentAdmin = currentAdmin;
  }
  /**
   * Returns context for given action
   * @private
   *
   * @param   {ActionRequest}  request  request object
   * @return  {Promise<ActionContext>} action context
   */


  async getActionContext(request) {
    const {
      resourceId,
      action: actionName
    } = request.params;
    const h = new _viewHelpers.default(this._admin);

    const resource = this._admin.findResource(resourceId);

    const action = resource.decorate().actions[actionName];
    return _objectSpread({
      resource,
      action,
      h,
      currentAdmin: this.currentAdmin,
      _admin: this._admin
    }, this._admin.translateFunctions);
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


  async search(request, response) {
    request.params.action = 'search'; // eslint-disable-next-line no-console

    console.log(['Using ApiController#search is deprecated in favour of resourceAction', 'It will be removed in the next version'].join('\n'));
    return this.resourceAction(request, response);
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


  async resourceAction(originalRequest, response) {
    const actionContext = await this.getActionContext(originalRequest);
    const request = (0, _requestParser.requestParser)(originalRequest, actionContext.resource);
    return actionContext.action.handler(request, response, actionContext);
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


  async recordAction(originalRequest, response) {
    const {
      recordId,
      resourceId
    } = originalRequest.params;
    const actionContext = await this.getActionContext(originalRequest);
    const request = (0, _requestParser.requestParser)(originalRequest, actionContext.resource);

    if (!recordId) {
      throw new _notFoundError.default(['You have to pass recordId to the recordAction'].join('\n'), 'Action#handler');
    }

    let record = await actionContext.resource.findOne(recordId);

    if (!record) {
      throw new _notFoundError.default([`record with given id: "${recordId}" cannot be found in resource "${resourceId}"`].join('\n'), 'Action#handler');
    }

    [record] = await (0, _populator.default)([record]);
    actionContext.record = record;
    const jsonWithRecord = await actionContext.action.handler(request, response, actionContext);
    const isValidRecord = !!(jsonWithRecord && jsonWithRecord.record && jsonWithRecord.record.recordActions);
    const anErrorWasHandled = jsonWithRecord && jsonWithRecord.notice && jsonWithRecord.notice.type === 'error';

    if (isValidRecord || anErrorWasHandled) {
      return jsonWithRecord;
    }

    throw new _configurationError.default('handler of a recordAction should return a RecordJSON object', 'Action#handler');
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


  async bulkAction(originalRequest, response) {
    const {
      resourceId
    } = originalRequest.params;
    const {
      recordIds
    } = originalRequest.query || {};
    const actionContext = await this.getActionContext(originalRequest);
    const request = (0, _requestParser.requestParser)(originalRequest, actionContext.resource);

    if (!recordIds) {
      throw new _notFoundError.default(['You have to pass "recordIds" to the bulkAction via search params: ?recordIds=...'].join('\n'), 'Action#handler');
    }

    let records = await actionContext.resource.findMany(recordIds.split(','));

    if (!records || !records.length) {
      throw new _notFoundError.default([`record with given id: "${recordIds}" cannot be found in resource "${resourceId}"`].join('\n'), 'Action#handler');
    }

    records = await (0, _populator.default)(records);
    const jsonWithRecord = await actionContext.action.handler(request, response, _objectSpread(_objectSpread({}, actionContext), {}, {
      records
    }));

    if (jsonWithRecord && jsonWithRecord.records) {
      return jsonWithRecord;
    }

    throw new _configurationError.default('handler of a bulkAction should return an Array of RecordJSON object', 'Action#handler');
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


  async dashboard(request, response) {
    const h = new _viewHelpers.default(this._admin);
    const handler = this._admin.options.dashboard && this._admin.options.dashboard.handler;

    if (handler) {
      return handler(request, response, {
        h,
        currentAdmin: this.currentAdmin,
        _admin: this._admin
      });
    }

    return {
      message: ['You can override this method by setting up dashboard.handler', 'function in AdminJS options'].join('\n')
    };
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


  async page(request, response) {
    const h = new _viewHelpers.default(this._admin);
    const {
      pages = {}
    } = this._admin.options;
    const {
      pageName
    } = request.params;
    const {
      handler
    } = pages[pageName] || {};

    if (handler) {
      return handler(request, response, {
        h,
        currentAdmin: this.currentAdmin,
        _admin: this._admin
      });
    }

    return {
      message: ['You can override this method by setting up pages[pageName].handler', 'function in AdminJS options'].join('\n')
    };
  }

}

var _default = ApiController;
exports.default = _default;