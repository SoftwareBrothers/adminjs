"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BulkDeleteAction = void 0;

var _notFoundError = _interopRequireDefault(require("../../utils/errors/not-found-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @implements Action
 * @category Actions
 * @module BulkDeleteAction
 * @description
 * Removes given records from the database.
 * @private
 */
const BulkDeleteAction = {
  name: 'bulkDelete',
  isVisible: true,
  actionType: 'bulk',
  icon: 'Delete',
  showInDrawer: true,
  variant: 'danger',

  /**
   * Responsible for deleting existing records.
   *
   * To invoke this action use {@link ApiClient#bulkAction}
   * with {actionName: _bulkDelete_}
   *
   * @return  {Promise<BulkActionResponse>}
   * @implements ActionHandler
   * @memberof module:BulkDeleteAction
   */
  handler: async (request, response, context) => {
    const {
      records,
      resource,
      h,
      translateMessage
    } = context;

    if (!records || !records.length) {
      throw new _notFoundError.default('no records were selected.', 'Action#handler');
    }

    if (request.method === 'get') {
      const recordsInJSON = records.map(record => record.toJSON(context.currentAdmin));
      return {
        records: recordsInJSON
      };
    }

    if (request.method === 'post') {
      var _resource$_decorated;

      await Promise.all(records.map(record => resource.delete(record.id())));
      return {
        records: records.map(record => record.toJSON(context.currentAdmin)),
        notice: {
          message: translateMessage('successfullyBulkDeleted', resource.id(), {
            count: records.length
          }),
          type: 'success'
        },
        redirectUrl: h.resourceUrl({
          resourceId: ((_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.id()) || resource.id()
        })
      };
    }

    throw new Error('method should be either "post" or "get"');
  }
};
exports.BulkDeleteAction = BulkDeleteAction;
var _default = BulkDeleteAction;
exports.default = _default;