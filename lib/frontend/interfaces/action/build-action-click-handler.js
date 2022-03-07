"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildActionClickHandler = void 0;

var _actionHasComponent = require("./action-has-component");

var _actionHref = require("./action-href");

var _buildActionApiCallTrigger = require("./build-action-api-call-trigger");

/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */

/* eslint-disable no-alert */
const buildActionClickHandler = options => {
  const {
    action,
    params,
    actionResponseHandler,
    push
  } = options;

  const handleActionClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const href = (0, _actionHref.actionHref)(action, params);
    const callApi = (0, _buildActionApiCallTrigger.buildActionCallApiTrigger)({
      params,
      action,
      actionResponseHandler
    });

    if (action.guard && !confirm(action.guard)) {
      return;
    }

    if ((0, _actionHasComponent.actionHasComponent)(action)) {
      callApi();
    } else if (href) {
      push(href, {
        previousPage: window.location.href
      });
    }
  };

  return handleActionClick;
};

exports.buildActionClickHandler = buildActionClickHandler;