"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _designSystem = require("@adminjs/design-system");

var _configurationError = _interopRequireDefault(require("../../utils/errors/configuration-error"));

var _viewHelpers = _interopRequireDefault(require("../../utils/view-helpers/view-helpers"));

var _actionErrorHandler = _interopRequireDefault(require("../../services/action-error-handler/action-error-handler"));

var _forbiddenError = _interopRequireDefault(require("../../utils/errors/forbidden-error"));

var _layoutElementParser = require("../../utils/layout-element-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_VARIANT = 'default';
/**
 * Decorates an action
 *
 * @category Decorators
 */

class ActionDecorator {
  /**
   * @param {Object}        params
   * @param {Action}        params.action
   * @param {BaseResource}  params.resource
   * @param {AdminJS}      params.admin  current instance of AdminJS
   */
  constructor({
    action,
    admin,
    resource
  }) {
    if (!action.actionType) {
      throw new _configurationError.default(`action: "${action.name}" does not have an "actionType" property`, 'Action');
    }

    this.name = action.name;
    this._admin = admin;
    this._resource = resource;
    this.h = new _viewHelpers.default({
      options: admin.options
    });
    /**
     * Original action object
     * @type {Action}
     */

    this.action = action;
  }
  /**
   * Original handler wrapped with the hook `before` and `after` methods.
   *
   * @param {ActionRequest} request
   * @param {any} response
   * @param {ActionContext} context
   *
   * @return {Promise<any>}
   */


  async handler(request, response, context) {
    try {
      const modifiedRequest = await this.invokeBeforeHook(request, context);
      this.canInvokeAction(context);
      const res = await this.invokeHandler(modifiedRequest, response, context);
      return this.invokeAfterHook(res, modifiedRequest, context);
    } catch (error) {
      return (0, _actionErrorHandler.default)(error, context);
    }
  }
  /**
   * Invokes before action hooks if there are any
   *
   * @param {ActionRequest} request
   * @param {ActionContext} context
   *
   * @return {Promise<ActionRequest>}
   */


  async invokeBeforeHook(request, context) {
    if (!this.action.before) {
      return request;
    }

    if (typeof this.action.before === 'function') {
      return this.action.before(request, context);
    }

    if (Array.isArray(this.action.before)) {
      return this.action.before.reduce((prevPromise, hook) => prevPromise.then(modifiedRequest => hook(modifiedRequest, context)), Promise.resolve(request));
    }

    throw new _configurationError.default('Before action hook has to be either function or Array<function>', 'Action#Before');
  }
  /**
   * Invokes action handler if there is any
   *
   * @param {ActionRequest} request
   * @param {any} response
   * @param {ActionContext} context
   *
   * @return {Promise<ActionResponse>}
   */


  async invokeHandler(request, response, context) {
    if (typeof this.action.handler === 'function') {
      return this.action.handler(request, response, context);
    }

    if (Array.isArray(this.action.handler)) {
      return this.action.handler.reduce((prevPromise, handler) => prevPromise.then(() => handler(request, response, context)), Promise.resolve({}));
    }

    throw new _configurationError.default('Action handler has to be either function or Array<function>', 'Action#Before');
  }
  /**
   * Invokes after action hooks if there are any
   *
   * @param {ActionResponse} response
   * @param {ActionRequest} request
   * @param {ActionContext} context
   *
   * @return {Promise<ActionResponse>}
   */


  async invokeAfterHook(response, request, context) {
    if (!this.action.after) {
      return response;
    }

    if (typeof this.action.after === 'function') {
      return this.action.after(response, request, context);
    }

    if (Array.isArray(this.action.after)) {
      return this.action.after.reduce((prevPromise, hook) => prevPromise.then(modifiedResponse => hook(modifiedResponse, request, context)), Promise.resolve(response));
    }

    throw new _configurationError.default('After action hook has to be either function or Array<function>', 'Action#After');
  }
  /**
   * Returns true when action can be performed on a record
   *
   * @return  {Boolean}
   */


  isRecordType() {
    return this.action.actionType.includes('record');
  }
  /**
   * Returns true when action can be performed on an entire resource
   *
   * @return  {Boolean}
   */


  isResourceType() {
    return this.action.actionType.includes('resource');
  }
  /**
   * Returns true when action can be performed on selected records
   *
   * @return  {Boolean}
   */


  isBulkType() {
    return this.action.actionType.includes('bulk');
  }

  is(what, currentAdmin, record) {
    if (!['isAccessible', 'isVisible'].includes(what)) {
      throw new Error(`'what' has to be either "isAccessible" or "isVisible". You gave ${what}`);
    }

    let isAction;

    if (typeof this.action[what] === 'function') {
      isAction = this.action[what]({
        resource: this._resource,
        record,
        action: this,
        h: this.h,
        currentAdmin,
        _admin: this._admin
      });
    } else if (typeof this.action[what] === 'undefined') {
      isAction = true;
    } else {
      isAction = this.action[what];
    }

    return isAction;
  }
  /**
   * Is action visible in the UI
   * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
   * @param {BaseRecord} [record]
   *
   * @return  {Boolean}
   */


  isVisible(currentAdmin, record) {
    return this.is('isVisible', currentAdmin, record);
  }
  /**
   * Is action accessible
   *
   * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
   * @param {BaseRecord} [record]
   * @return  {Boolean}
   */


  isAccessible(currentAdmin, record) {
    return this.is('isAccessible', currentAdmin, record);
  }
  /**
   * Indicates if user can invoke given action
   *
   * @param   {ActionContext}  context  passed action context
   *
   * @return  {boolean}                 true given user has rights to the action
   * @throws  {ForbiddenError}          when user cannot perform given action
   */


  canInvokeAction(context) {
    const {
      record,
      records,
      currentAdmin,
      resource
    } = context;

    if (record && this.isAccessible(currentAdmin, record)) {
      return true;
    }

    if (records && !records.find(bulkRecord => !this.isAccessible(currentAdmin, bulkRecord))) {
      return true;
    }

    if (!record && !records && this.isAccessible(currentAdmin)) {
      return true;
    }

    throw new _forbiddenError.default(this._admin.translateMessage('forbiddenError', resource.id(), {
      actionName: this.name,
      resourceId: resource.id()
    }));
  }

  containerWidth() {
    if (typeof this.action.containerWidth === 'undefined') {
      return this.action.showInDrawer ? _designSystem.DEFAULT_DRAWER_WIDTH : 1; // 100% for a regular action
    }

    return this.action.containerWidth;
  }

  layout(currentAdmin) {
    if (this.action.layout) {
      let layoutConfig;

      if (typeof this.action.layout === 'function') {
        layoutConfig = this.action.layout(currentAdmin);
      } else {
        layoutConfig = this.action.layout;
      }

      return layoutConfig.map(element => (0, _layoutElementParser.layoutElementParser)(element));
    }

    return null;
  }

  variant() {
    return this.action.variant || DEFAULT_VARIANT;
  }

  parent() {
    return this.action.parent || null;
  }

  custom() {
    return this.action.custom || {};
  }

  hasHandler() {
    return !!this.action.handler;
  }
  /**
   * Serializes action to JSON format
   *
   * @param {CurrentAdmin} [currentAdmin]
   *
   * @return  {ActionJSON}  serialized action
   */


  toJSON(currentAdmin) {
    var _this$_resource$_deco;

    const resourceId = ((_this$_resource$_deco = this._resource._decorated) === null || _this$_resource$_deco === void 0 ? void 0 : _this$_resource$_deco.id()) || this._resource.id();

    return {
      name: this.action.name,
      actionType: this.action.actionType,
      icon: this.action.icon,
      label: this._admin.translateAction(this.action.name, resourceId),
      resourceId,
      guard: this.action.guard ? this._admin.translateMessage(this.action.guard, resourceId) : '',
      showFilter: !!this.action.showFilter,
      component: this.action.component,
      showInDrawer: !!this.action.showInDrawer,
      hideActionHeader: !!this.action.hideActionHeader,
      containerWidth: this.containerWidth(),
      layout: this.layout(currentAdmin),
      variant: this.variant(),
      parent: this.parent(),
      hasHandler: this.hasHandler(),
      custom: this.custom()
    };
  }

}

var _default = ActionDecorator;
exports.default = _default;