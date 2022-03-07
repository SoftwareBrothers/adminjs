"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Indicates if route action should be updated, meaning whether it should fetch
 * new data from the backend.
 * @private
 *
 * @param {AnyActionParams} currentMatchParams
 * @param {AnyActionParams} newMatchParams
 * @return  {boolean}
 */
const shouldActionReFetchData = (currentMatchParams, newMatchParams) => {
  const {
    resourceId,
    recordId,
    actionName
  } = currentMatchParams;
  const {
    resourceId: newResourceId,
    recordId: newRecordId,
    actionName: newActionName
  } = newMatchParams;
  return resourceId !== newResourceId || recordId !== newRecordId || actionName !== newActionName;
};

var _default = shouldActionReFetchData;
exports.default = _default;