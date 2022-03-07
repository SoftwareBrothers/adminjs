"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildActionCallApiTrigger = void 0;

var _callActionApi = require("./call-action-api");

/* eslint-disable arrow-parens */
const buildActionCallApiTrigger = options => {
  const {
    action,
    params,
    actionResponseHandler,
    search
  } = options;

  const callApi = () => {
    const promise = (0, _callActionApi.callActionApi)(action, params, search);
    promise.then(actionResponseHandler).catch(error => {
      throw error;
    });
    return promise;
  };

  return callApi;
};

exports.buildActionCallApiTrigger = buildActionCallApiTrigger;