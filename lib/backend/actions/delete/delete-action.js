"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DeleteAction = void 0;

var _notFoundError = _interopRequireDefault(require("../../utils/errors/not-found-error"));

var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @implements Action
 * @category Actions
 * @module DeleteAction
 * @description
 * Removes given record from the database. Since it doesn't have a
 * component - it redirects right away after clicking its {@link ActionButton}
 * @private
 */
const DeleteAction = {
  name: 'delete',
  isVisible: true,
  actionType: 'record',
  icon: 'TrashCan',
  guard: 'confirmDelete',
  component: false,
  variant: 'danger',

  /**
   * Responsible for deleting existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {Promise<RecordActionResponse>}
   * @implements ActionHandler
   * @memberof module:DeleteAction
   */
  handler: async (request, response, data) => {
    var _resource$_decorated;

    const {
      record,
      resource,
      currentAdmin,
      h,
      translateMessage
    } = data;

    if (!request.params.recordId || !record) {
      throw new _notFoundError.default(['You have to pass "recordId" to Delete Action'].join('\n'), 'Action#handler');
    }

    try {
      await resource.delete(request.params.recordId);
    } catch (error) {
      if (error instanceof _validationError.default && error.baseError) {
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: error.baseError.message,
            type: 'error'
          }
        };
      }

      throw error;
    }

    return {
      record: record.toJSON(currentAdmin),
      redirectUrl: h.resourceUrl({
        resourceId: ((_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.id()) || resource.id()
      }),
      notice: {
        message: translateMessage('successfullyDeleted', resource.id()),
        type: 'success'
      }
    };
  }
};
exports.DeleteAction = DeleteAction;
var _default = DeleteAction;
exports.default = _default;