"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useActionResponseHandler = void 0;

var _reactRouter = require("react-router");

var _appendForceRefresh = require("../../components/actions/utils/append-force-refresh");

var _useNotice = require("../use-notice");

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const useActionResponseHandler = onActionCall => {
  const location = (0, _reactRouter.useLocation)();
  const history = (0, _reactRouter.useHistory)();
  const addNotice = (0, _useNotice.useNotice)();
  return response => {
    const {
      data
    } = response;

    if (data.notice) {
      addNotice(data.notice);
    }

    if (data.redirectUrl && location.pathname !== data.redirectUrl) {
      const appended = (0, _appendForceRefresh.appendForceRefresh)(data.redirectUrl);
      history.push(appended, {
        previousPage: window.location.href
      });
    }

    if (onActionCall) {
      onActionCall(data);
    }
  };
};

exports.useActionResponseHandler = useActionResponseHandler;