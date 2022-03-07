"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ShowAction = void 0;

var _notFoundError = _interopRequireDefault(require("../../utils/errors/not-found-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @implements Action
 * @category Actions
 * @module ShowAction
 * @description
 * Returns selected Record
 * Uses {@link ShowAction} component to render form
 * @private
 */
const ShowAction = {
  name: 'show',
  isVisible: true,
  actionType: 'record',
  icon: 'Screen',
  showInDrawer: false,

  /**
   * Responsible for returning data for given record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   * @memberof module:ShowAction
   *
   * @return  {Promise<RecordActionResponse>}  populated record
   * @implements ActionHandler
   */
  handler: async (request, response, data) => {
    if (!data.record) {
      throw new _notFoundError.default([`Record of given id ("${request.params.recordId}") could not be found`].join('\n'), 'Action#handler');
    }

    return {
      record: data.record.toJSON(data.currentAdmin)
    };
  }
};
exports.ShowAction = ShowAction;
var _default = ShowAction;
exports.default = _default;