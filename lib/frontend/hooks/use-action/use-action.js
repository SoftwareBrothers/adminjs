"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAction = useAction;

var _reactRouter = require("react-router");

var _interfaces = require("../../interfaces");

var _actionHref = require("../../interfaces/action/action-href");

var _useActionResponseHandler = require("./use-action-response-handler");

/**
 * @load ./use-action.doc.md
 * @subcategory Hooks
 *
 * @param {ActionJSON}   action      action object
 * @param {ActionParams} params
 * @param {ActionCallCallback} onActionCall - callback triggered when action is performed
 * @return {UseActionResult}
 * @new In version 3.3
 * @class
 * @hideconstructor
 */
function useAction(action, params, onActionCall) {
  const history = (0, _reactRouter.useHistory)();
  const actionResponseHandler = (0, _useActionResponseHandler.useActionResponseHandler)(onActionCall);
  const href = (0, _actionHref.actionHref)(action, params);
  const callApi = (0, _interfaces.buildActionCallApiTrigger)({
    action,
    params,
    actionResponseHandler
  });
  const handleClick = (0, _interfaces.buildActionClickHandler)({
    action,
    params,
    actionResponseHandler,
    push: history.push
  });
  return {
    href,
    callApi,
    handleClick
  };
}