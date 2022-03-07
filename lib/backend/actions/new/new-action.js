"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NewAction = void 0;

var _utils = require("../../utils");

var _paramConverter = require("../../../utils/param-converter");

/**
 * @implements Action
 * @category Actions
 * @module NewAction
 * @description
 * Shows form for creating a new record
 * Uses {@link NewAction} component to render form
 * @private
 */
const NewAction = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'Add',
  showInDrawer: false,
  variant: 'primary',

  /**
   * Responsible for creating new record.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   *
   * @implements Action#handler
   * @memberof module:NewAction
   * @return {Promise<RecordActionResponse>} populated records
   */
  handler: async (request, response, context) => {
    const {
      resource,
      h,
      currentAdmin,
      translateMessage
    } = context;

    if (request.method === 'post') {
      var _request$payload;

      const params = _paramConverter.paramConverter.prepareParams((_request$payload = request.payload) !== null && _request$payload !== void 0 ? _request$payload : {}, resource);

      let record = await resource.build(params);
      record = await record.create();
      const [populatedRecord] = await (0, _utils.populator)([record]); // eslint-disable-next-line no-param-reassign

      context.record = populatedRecord;

      if (record.isValid()) {
        var _resource$_decorated;

        return {
          redirectUrl: h.resourceUrl({
            resourceId: ((_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.id()) || resource.id()
          }),
          notice: {
            message: translateMessage('successfullyCreated', resource.id()),
            type: 'success'
          },
          record: record.toJSON(currentAdmin)
        };
      }

      return {
        record: record.toJSON(currentAdmin),
        notice: {
          message: translateMessage('thereWereValidationErrors', resource.id()),
          type: 'error'
        }
      };
    } // TODO: add wrong implementation error


    throw new Error('new action can be invoked only via `post` http method');
  }
};
exports.NewAction = NewAction;
var _default = NewAction;
exports.default = _default;