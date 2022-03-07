"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callActionApi = callActionApi;

var _utils = require("../../utils");

const api = new _utils.ApiClient();

function callActionApi(action, params, search) {
  let promise;
  const {
    recordId,
    recordIds,
    resourceId
  } = params;

  switch (action.actionType) {
    case 'record':
      if (!recordId) {
        throw new Error('You have to specify "recordId" for record action');
      }

      promise = api.recordAction({
        resourceId,
        actionName: action.name,
        recordId,
        search
      });
      break;

    case 'resource':
      promise = api.resourceAction({
        resourceId,
        actionName: action.name
      });
      break;

    case 'bulk':
      if (!recordIds) {
        throw new Error('You have to specify "recordIds" for bulk action');
      }

      promise = api.bulkAction({
        resourceId,
        actionName: action.name,
        recordIds,
        search
      });
      break;

    default:
      throw new Error('"actionType" should be either record, resource or bulk');
  }

  return promise;
}